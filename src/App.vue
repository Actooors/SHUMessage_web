<template>
  <div id="app">
    <img src="/static/faviconTiny144.png" style="height:0;font-size:0;position:fixed;">
    <keep-alive :include="['mainpage','msgDetail']">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import {getUserInfoFromToken} from 'assets/js/tokenTools'
  import store from 'store/store'

  export default {
    name: 'app',
    data: () => ({
      scrollTop: -1,
      scrollHeight: -1,
      clientHeight: -1,
      startY: -1
    }),
    watch: {
      '$route'(to, from) {
        this.storeAndRestoreScrollState(to, from);
      }
    },
    mounted() {
      localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNjEyMjEzMSIsImV4cCI6MTg1NjM3MDkzMSwidXNlck5hbWUiOiLpg63lrZ_nhLYiLCJpYXQiOjE1NDUzMzA5MzF9.xmeHnjdFMj6sTDl9qJoJnRwUu-I1iUX2VXznQal9DL6kAw8CyGWoKsNDgIAejqPriOksy9Faee96tZkCeZ5W5w')
      console.log(getUserInfoFromToken())
      //解除iOS的橡皮筋回弹效果
      // this.InitAginstRubberBand()
    },
    methods: {
      storeAndRestoreScrollState(to, from) {
        //store
        let scrollBody = document.querySelector('#scrollComponentBody')
        if (scrollBody) {
          store.commit("pushRouter/SET_SCROLL_TOP", {
            index: from.fullPath,
            val: scrollBody.scrollTop
          });
        }

        //restore
        const topBar = document.querySelector('#topBar');
        const tab = document.querySelector('#tab');
        let topBarTop;
        let tabTop;
        if (topBar) {
          topBarTop = topBar.style.top;
          tabTop = tab.style.top;
        }
        this.$nextTick(() => {
          const instance = to.matched[to.matched.length - 1].instances.default
          if (instance && instance.$el && instance.$el.querySelector) {
            //复用变量名
            // TODO:这个函数好像有点问题需要修复.
            //console.log(instance.$el,instance.$el.querySelector)
            scrollBody = instance.$el.querySelector('#scrollComponentBody');
            if (scrollBody) {
              scrollBody.scrollTop = store.state.pushRouter.scrollTop[to.fullPath] || 0;
              if (
                //有topBar（在background界面）
                topBar
                //这个页面曾经往下滚了滚但没滚多少，在别的页面的topBar盖不住灰色padding（策略是切换时尽量不使topBar变化）
                && -parseInt(topBar.style.top) > (store.state.pushRouter.scrollTop[to.fullPath] || 0)
              ) {
                //是否有访问过该页（该页在缓存的话，设置scrollTop为>0的值才有用）
                if (store.state.pushRouter.scrollTop[to.fullPath] != null) {
                  scrollBody.scrollTop = -parseInt(topBar.style.top);
                } else {
                  //没办法，只能让topBar拉下来了
                  topBar.style.top = `0px`;
                  tab.style.top = `${store.state.playground.searchHeight}px`
                }
              } else if (topBar) {
                //本身是不需要置top的，但不知怎的，这里必须重写top。这里使用setTimeout而不是nextTick
                setTimeout(() => {
                  topBar.style.top = topBarTop;
                  tab.style.top = tabTop
                }, 20)
              }
            }
          }
        })
      },
      isChildOrItself(parent, child) {
        if (child === parent) {
          return true
        }
        while (child !== parent && child) {
          child = child.parentElement
        }
        return !!child
      },
      judgeAncestors(el, func) {
        while (el && !func(el)) {
          el = el.parentElement;
        }
        return !!el;
      },
      InitAginstRubberBand() {
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
          if (this.judgeAncestors(event.target, (el) => (/\bneedsscroll\b/).test(el.className))) {
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
      }
    }
  }
</script>

<style lang="less">
  @import url('//at.alicdn.com/t/font_806770_rdeyn6a663m.css');
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
