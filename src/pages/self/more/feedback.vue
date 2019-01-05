<template>
  <div class="more-wrapper">
    <group>
      <x-input title="问题类型:" placeholder="其他问题" disabled></x-input>
      <x-textarea placeholder="请补充详细问题和意见,SHUMessage助手会认真看完哦~" :height=150 v-model="feedback"></x-textarea>
      <img src="../../../assets/images/添加.png" class="upload" @click.native="uploadImg">
      <x-input title="联系方式" placeholder="请输入手机号码" keyboard="number" v-model="phoneNum" is-type="china-mobile"></x-input>
    </group>
    <x-button @click.native="submit" style="border-radius:99px; width: 150px; height: 50px; margin-top: 30px"
              :gradients="['#1D62F0', '#19D5FD']">
      <div style="font-size: 15px">提交</div>
    </x-button>
  </div>
</template>

<script>
  import {Group, Cell, XInput, XTextarea, XButton, Toast} from 'vux'

  export default {
    name: "feedback",
    data() {
      return {
        feedback:'',
        phoneNum: ''
      }
    },
    components: {
      Group,
      Cell,
      XInput,
      XTextarea,
      XButton,
      Toast
    },
    methods: {
      uploadImg() {
        //TODO
      },
      submit() {
        if(this.feedback.length===0) {
          this.$toast({text: '请填写反馈内容~', type: 'warning'});
        }else {
          this.$toast({text: '反馈成功~'});
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "more";
</style>
<style scoped>
  .upload {
    width: 80px;
    margin-left: 8px;
  }
</style>
