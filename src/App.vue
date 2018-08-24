<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="less">
  @import url('//at.alicdn.com/t/font_806770_166zwbtwxc9.css');
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
  @import 'assets/css/reset.css';

  body {
    background-color: #fbf9fe;
  }
</style>
