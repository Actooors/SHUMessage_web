<template>
  <div id="app">
    <img src="/static/faviconTiny144.png" style="height:0;font-size:0;position:fixed;">
    <keep-alive
      :include="['mainpage','msgDetail','commentDetail']"
    >
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import {getUserInfoFromToken} from 'assets/js/tokenTools'

  export default {
    name: 'app',
    data: () => ({
      scrollTop: -1,
      scrollHeight: -1,
      clientHeight: -1,
      startY: -1
    }),
    mounted() {
      localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNjEyMjEzMSIsImV4cCI6MTU0MjgxNTUwOSwidXNlck5hbWUiOiIlRTklODMlQUQlRTUlQUQlOUYlRTclODQlQjYiLCJpYXQiOjE1Mzc2MzE1MDl9.rsf2EQxeEs1B9_ZLERZ66pnoUPrYI7mn4g0ycTOU289GfzkdYciOR1m5a9osIXFt7UpAFfWET02NIi-RbgXmEA')
      console.log(getUserInfoFromToken())
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
        //事实上所有的needsscroll都需要按照viewBox的模式进行处理，这里暂不做处理。
        if ((/\bneedsscroll\b/).test(event.target.className)) {
          return
        }
        //如果target是可滚动的viewBox，先看看会不会超出边界
        if (nodeViewBox && that.isChildOrItself(nodeViewBox, event.target) &&
          !(that.scrollTop === 0 && moveY - that.startY > 0) &&//已经到最顶了，还想往上滚
          !(that.scrollTop + that.clientHeight === that.scrollHeight && moveY - that.startY < 0)//到最底了还想向下滚
        ) {
          //放它走，允许滚动
          return
        }
        //阻止滚动
        console.log("* 已阻止可能导致橡皮筋效果的touchmove事件")
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
  @import url('//at.alicdn.com/t/font_806770_pwhj8nmm3p.css');
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/close.less';

  body {
    background-color: #fbf9fe;
  }
</style>
<style lang="scss">
  @import 'assets/css/reset.scss';
</style>
