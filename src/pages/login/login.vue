<template>
  <div class="page-wrapper">
    <div class="logoWrapper">
      <img class="logo" src="../../../static/logo.png">
    </div>
    <div class="form">
      <div class="form-group">
        <i class="icon-user icon iconfont"></i>
        <input type="text" :placeholder="placeholder" class="input-text">
      </div>
      <div class="form-group">
        <i class="icon-lock icon iconfont"></i>
        <input type="password" placeholder="密码" class="input-text">
      </div>
      <div class="form-group">
        <button class="submit-button" @click="login">登 录</button>
      </div>
      <div class="divider">
        <hr class="form-hr">
        <span class="form-hr-font">第三方快捷登录</span>
      </div>
      <div class="fast-login-group">
        <div class="SHULogin" @click="switchAccount(0)">
          <img src="../../assets/images/qq.png" class="icon">
          <div>QQ账号</div>
        </div>
        <div class="QQLogin" @click="switchAccount(1)">
          <img src="../../assets/images/weibo.png" class="icon">
          <div>微博账号</div>
        </div>
        <div class="WechatLogin" @click="switchAccount(2)">
          <img src="../../assets/images/weixin.png" class="icon">
          <div>微信账号</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import {ToastPlugin, LoadingPlugin} from 'vux'
  import Vue from 'vue'

  Vue.use(ToastPlugin)
  Vue.use(LoadingPlugin)

  export default {
    name: "login",
    data() {
      return {
        placeholder: 'SHU Message账号',
      }
    },
    methods: {
      login() {
        let that = this
        this.$vux.loading.show({
          text: '登录中...',
          isShowMask: true
        })
        axios({
          url: apiRoot + '/login',
          method: 'post',
          data: {
            //TODO 新后端是userId
            uid: '16121670',
            password: 'xxxxxx',
            //TODO type暂时也还没有
            // loginType: 'school'

          }
        }).then((res) => {
          //TODO 屎山后端 code暂时还是SUCCESS 以后是200
          if (res.data.code === 'SUCCESS') {
            console.log(res.data)
            that.$vux.loading.hide();
            localStorage.setItem('uid', res.data.data.uid);
            localStorage.setItem('token', res.data.data.token);
            localStorage.setItem('username', res.data.data.username);
            // localStorage.setItem('token', res.data.data.token);
            // localStorage.setItem('userId', res.data.data.userId);
            // localStorage.setItem('actualName', res.data.data.actualName);
            // localStorage.setItem('identity', res.data.data.identity);
            // localStorage.setItem('studentCardId', res.data.data.studentCardId);
            that.$vux.toast.show({
              text: '登录成功',
              isShowMask: true
            });
          } else {
            that.$vux.loading.hide();
            that.$vux.toast.show({
              type: 'cancel',
              text: res.data.message,
              isShowMask: true
            })
          }
        })
      },
      switchAccount(i) {
        switch (i) {
          case 0:
            this.placeholder = "QQ账号"
            break
          case 1:
            this.placeholder = "微博账号"
            break
          case 2:
            this.placeholder = "微信号"
            break
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "login.scss";
</style>
