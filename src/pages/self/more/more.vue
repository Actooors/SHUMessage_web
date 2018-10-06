<template>
  <div class="more-wrapper">
    <group class="group-person">
      <cell title="更改个人信息" is-link link="/self/more/myinfo">
        <img slot="icon" width="20" style="display:block;margin-right:1rem;" :src="require('assets/images/avatar.png')">
      </cell>
      <cell title="更改签名" is-link link="/self/more/signature">
        <img slot="icon" width="20" style="display:block;margin-right:1rem;" :src="require('assets/images/avatar.png')">
      </cell>
      <cell title="添加兴趣" is-link link="/self/more/pi">
        <img slot="icon" width="20" style="display:block;margin-right:1rem;" :src="require('assets/images/avatar.png')">
      </cell>
    </group>
    <group class="group-safety">
      <cell title="修改密码" is-link link="/self/more/checkpwd">
        <img slot="icon" width="20" style="display:block;margin-right:1rem;" :src="require('assets/images/avatar.png')">
      </cell>
      <cell title="修改手机" is-link link="/self/more/pi">
        <img slot="icon" width="20" style="display:block;margin-right:1rem;" :src="require('assets/images/avatar.png')">
      </cell>
    </group>
    <group class="group-feedback">
      <cell title="安利分享" is-link @click.native="shareToOthers">
        <img slot="icon" width="20" style="display:block;margin-right:1rem;" :src="require('assets/images/avatar.png')">
      </cell>
      <cell title="常见问题" is-link link="/self/more/pi">
        <img slot="icon" width="20" style="display:block;margin-right:1rem;" :src="require('assets/images/avatar.png')">
      </cell>
      <cell title="新版功能" is-link link="/self/more/pi">
        <img slot="icon" width="20" style="display:block;margin-right:1rem;" :src="require('assets/images/avatar.png')">
      </cell>
      <cell title="用户反馈" is-link link="/self/more/feedback">
        <img slot="icon" width="20" style="display:block;margin-right:1rem;" :src="require('assets/images/avatar.png')">
      </cell>
    </group>
    <share
      v-model="showPopup"
      :url="$route.query.url"
      title="SHU Message"
      digest="一款美观,实用,稳定的且仅为SHU师生服务的消息聚合及分享平台"
    ></share>
    <!--此处需要提供shu_message的主页url TODO-->
  </div>
</template>

<script>
  import {Cell, Group} from 'vux'
  import Share from 'components/share/share'

  export default {
    name: "more",
    components: {
      Cell,
      Group,
      Share
    },
    data() {
      return {
        showPopup: false
      }
    },
    methods: {
      shareToOthers() {
        this.showPopup = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "more";
</style>
<style lang="scss">
  .force-black {
    .vux-header-title, .vux-header-back, .vux-header-left, .vux-header-right {
      /*color: black !important;*/
    }
  }
</style>
