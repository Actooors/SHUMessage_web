<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'app',
    created() {
      //解除iOS的橡皮筋回弹效果
      document.body.addEventListener('touchmove', (event) => {
        event.preventDefault()
      }, {passive: false})
    }
  }
</script>

<style lang="less">
  @import url('//at.alicdn.com/t/font_806770_u0gleoffom.css');
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';

  body {
    background-color: #fbf9fe;
  }
</style>
<style lang="scss">
  @import 'assets/css/reset.scss';
</style>
