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
    data: () => ({
      scrollTop: -1,
      scrollHeight: -1,
      clientHeight: -1,
      startY: -1
    }),
    mounted() {
      //解除iOS的橡皮筋回弹效果
      let that = this;
      document.body.addEventListener('touchstart', (event) => {
        let nodeViewBox = document.querySelector('#__viewBox #vux_view_box_body')
        if (nodeViewBox) {
          that.scrollTop = nodeViewBox.scrollTop
          that.scrollHeight = nodeViewBox.scrollHeight
          that.clientHeight = nodeViewBox.clientHeight
          that.startY = event.touches[0].pageY
        }
      })
      document.body.addEventListener('touchmove', (event) => {
        let nodeViewBox = document.querySelector('#__viewBox #vux_view_box_body')
        let moveY = event.touches[0].pageY
        //如果target是可滚动的viewBox，先看看会不会超出边界
        if (nodeViewBox && that.isChildOrItself(nodeViewBox, event.target) &&
          !(that.scrollTop === 0 && moveY - that.startY > 0) &&//已经到最顶了，还想往上滚
          !(that.scrollTop + that.clientHeight === that.scrollHeight && moveY - that.startY < 0)//到最底了还想向下滚
        ) {
          //放它走，允许滚动
          return
        }
        //阻止滚动
        event.preventDefault()
      }, {passive: false})
    },
    methods: {
      isChildOrItself(parent, child) {
        if (child === parent) {
          return true
        }
        while (child !== parent && child) {
          child = child.parentElement
        }
        return !!child
      }
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
