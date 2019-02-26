<template>
  <div class="more-wrapper">
    <group>
      <x-textarea :max="15" v-model="value" @keypress.native="handleTextareKeypress($event)">
        <img slot="label" width="23" style="display:block;margin-right:1rem;"
             :src="require('assets/images/签名设置.png')">
      </x-textarea>
    </group>
    <toast v-model="showSuccess" @on-hide="pageBack">修改成功</toast>
  </div>
</template>

<script>
  import {XTextarea, Group, Toast} from 'vux'
  import store from "store/store"

  export default {
    name: "signature",
    store,
    components: {XTextarea, Group, Toast},
    data() {
      return {
        showSuccess: false,
        value: ""
      };
    },
    methods: {
      finish() {
        this.showSuccess = true
      },
      pageBack() {
        this.$router.go(-1)
      },
      handleTextareKeypress(event) {
        if (event.key === 'Enter') {
          event.preventDefault()
        }
      }
    },
    created() {
      store.commit('top/CHANGE_HEADER_OPTION_METHOD', this.finish)
    },
  };
</script>
<style lang="scss" scoped>
  @import "more";
</style>
<style scoped>

</style>
