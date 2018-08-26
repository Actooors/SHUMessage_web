<template>
  <div class="more-wrapper">
    <group class="group-person">
      <cell title="更改个人信息" is-link link="/self/more/myinfo">
        <img slot="icon" width="20" style="display:block;margin-right:1rem;" :src="require('assets/images/avatar.png')">
      </cell>
      <cell title="更改签名" is-link link="/self/more/pi">
        <img slot="icon" width="20" style="display:block;margin-right:1rem;" :src="require('assets/images/avatar.png')">
      </cell>
      <cell title="添加兴趣" is-link link="/self/more/pi">
        <img slot="icon" width="20" style="display:block;margin-right:1rem;" :src="require('assets/images/avatar.png')">
      </cell>
    </group>
    <group class="group-safety">
      <cell title="修改密码" is-link link="/self/more/pi">
        <img slot="icon" width="20" style="display:block;margin-right:1rem;" :src="require('assets/images/avatar.png')">
      </cell>
      <cell title="修改手机" is-link link="/self/more/pi">
        <img slot="icon" width="20" style="display:block;margin-right:1rem;" :src="require('assets/images/avatar.png')">
      </cell>
    </group>
    <group class="group-feedback">
      <cell title="安利分享" is-link link="/self/more/pi">
        <img slot="icon" width="20" style="display:block;margin-right:1rem;" :src="require('assets/images/avatar.png')">
      </cell>
      <cell title="常见问题" is-link link="/self/more/pi">
        <img slot="icon" width="20" style="display:block;margin-right:1rem;" :src="require('assets/images/avatar.png')">
      </cell>
      <cell title="新版功能" is-link link="/self/more/pi">
        <img slot="icon" width="20" style="display:block;margin-right:1rem;" :src="require('assets/images/avatar.png')">
      </cell>
      <cell title="用户反馈" is-link link="/self/more/pi">
        <img slot="icon" width="20" style="display:block;margin-right:1rem;" :src="require('assets/images/avatar.png')">
      </cell>
    </group>
  </div>
</template>

<script>
  import {Cell, Group} from 'vux'
  import store from 'store/store'

  export default {
    name: "more",
    store,
    components: {
      Cell,
      Group
    },
    created() {
      store.commit("top/CHANGE_HEADER_TITLE", "更多")
    }
  }
</script>

<style lang="scss" scoped>
  @import "more";
</style>
<style lang="scss">
  .force-black {
    .vux-header-title, .vux-header-back, .vux-header-left, .vux-header-right {
      color: black !important;
    }
  }
</style>
