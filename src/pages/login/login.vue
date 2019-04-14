<template>
  <div class="page-wrapper">
    <div class="logoWrapper">
      <img class="logo" src="../../../static/logo.png">
    </div>
    <div class="form">
      <div class="form-group">
        <i class="icon-user icon iconfont"></i>
        <input type="text" placeholder="SHU Message账号" class="input-text">
      </div>
      <div class="form-group">
        <i class="icon-lock icon iconfont"></i>
        <input type="password" placeholder="密码" class="input-text">
      </div>
      <div class="form-group">
        <button class="submit-button">登 录</button>
      </div>
      <div class="divider">
        <hr class="form-hr">
        <span class="form-hr-font">第三方快速登录</span>
      </div>
      <div class="fast-login-group">
        <div class="SHULogin">
          <img src="../../assets/images/qq.png" class="icon">
          <div>QQ账号</div>
        </div>
        <div class="QQLogin">
          <img src="../../assets/images/weibo.png" class="icon">
          <div>微博账号</div>
        </div>
        <div class="WechatLogin">
          <img src="../../assets/images/weixin.png" class="icon">
          <div>微信账号</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "login",
  }
</script>

<style scoped lang="less">
  @import "login.scss";
</style>
