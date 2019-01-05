<template>
  <div class="more-wrapper">
    <group>
      <x-input v-model="oldPwd" type="password" placeholder="请输入原密码"></x-input>
    </group>
    <group>
      <x-input v-model="newPwd1" type="password" placeholder="请输入新密码"></x-input>
    </group>
    <group>
      <x-input v-model="newPwd2" type="password" placeholder="再次输入新密码"></x-input>
    </group>
    <div class="forgetpwd" @click="findPwd">忘记密码</div>
  </div>
</template>

<script>
  import store from 'store/store'
  import {XInput, Group} from 'vux'

  export default {
    name: "checkpwd",
    data() {
      return {
        oldPwd: "",
        newPwd1: "",
        newPwd2: ""
      }
    },
    components: {
      XInput,
      Group
    },
    methods: {
      findPwd(){
        console.log("寻找密码")  //TODO
      },
      finish() {
        if (this.newPwd1 === '' || this.newPwd2 === '' || this.oldPwd === '') {
          this.$toast({text: '请设置密码', type: 'warning'});
        } else if (this.oldPwd !== "123123") {//不等于旧密码 //TODO
          this.$toast({text: '原密码不匹配', type: 'warning'});
        } else if ((this.newPwd1.length < 6 || this.newPwd2.length < 6) && (this.newPwd1 === this.newPwd2)) {
          this.$toast({text: '密码长度不能小于6位', type: 'warning'});
        } else if (this.newPwd1 !== this.newPwd2) {
          this.$toast({text: '两次密码不一致', type: 'warning'});
        } else if (!(this.newPwd1.length < 6 || this.newPwd2.length < 6) && (this.newPwd1 === this.newPwd2) && (this.newPwd1 === this.newPwd2)) {
          this.$toast({text: 'Loading'});
        }
      }
    },
    created() {
      store.commit('top/CHANGE_HEADER_OPTION_METHOD', this.finish)
    }
  }
</script>
<style lang="scss" scoped>
  @import "more";
</style>
<style scoped>
  .more-wrapper {
    width: 90%;
    margin: 70px auto 0 auto;
  }
  .forgetpwd{
    margin-top: 20px;
    text-align: center;
    color: #2196F3;
  }
</style>
