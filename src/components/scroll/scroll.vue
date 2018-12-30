<template>
  <ViewBox
    v-pull-to-refresh="pulldownCallback"
    class="needsscroll noscroll"
    ref="viewBox"
    :body-padding-bottom="bodyPaddingBottom"
  >
    <slot name="header" slot="header"></slot>
    <Spinner type="ripple" class="spinner" v-show="showLoadIcon"></Spinner>
    <div class="body">
      <slot></slot>
    </div>
    <div class="loading" v-if="loadingMore">
      <Spinner type="lines"></Spinner>
    </div>
    <LoadMore :show-loading=false tip="没有更多了" v-if="noMore"></LoadMore>
    <slot name="bottom" slot="bottom"></slot>
  </ViewBox>
</template>

<script>
  import {Spinner, ViewBox, LoadMore} from 'vux'
  import store from 'store/store'

  export default {
    name: "scroll",
    components: {Spinner, ViewBox, LoadMore},
    props: {
      noMore: {
        type: Boolean,
        default: false,
      },
      showLoadIcon: {
        type: Boolean,
        default: true
      },
      pulldownCallback: {
        //the function should return a promsie
        type: Function,
        required: true
      },
      pullupCallback: {
        //the function should return a promsie
        type: Function
      },
      bodyPaddingBottom: {
        type: String,
        default: "45px"
      }
    },
    data: () => ({
      scrollBody: null,
      loadingMore: false
    }),
    mounted() {
      this.scrollBody = this.$refs.viewBox.getScrollBody();
      this.scrollBody.addEventListener('scroll', this.handleScroll)
    },
    beforeDestroy() {
      this.scrollBody.removeEventListener('scroll', this.handleScroll)
    },
    watch: {
      '$route'(to, from) {
        //进入本页面
        let that = this;
        this.$nextTick(() => {
          /*
          FIXME:将to.path的scroll直接拿来用，这限制了一个路由只能有一个scroll组件
           */
          // console.log("!")
          that.$refs.viewBox.scrollTo(this.$store.state.pushRouter.detailScrollTop[to.path])
        })
      }
    },
    methods: {
      getScrollBody() {
        return this.$refs.viewBox.getScrollBody();
      },
      async handleScroll(event) {
        //position: Object{top,left}
        this.$emit('on-scroll', {top: this.scrollBody.scrollTop});

        if (
          typeof this.pullupCallback === "function"
          && !this.noMore
          && !this.loadingMore
          && this.scrollBody.scrollTop + this.scrollBody.offsetHeight >= this.scrollBody.scrollHeight * 0.8 //已经浏览完所显示的80%的评论了
        ) {
          this.loadingMore = true;
          await this.pullupCallback();
          this.loadingMore = false;
        }

        store.commit("pushRouter/SET_DETAIL_SCROLL_TOP", {
          index: this.$route.path,
          val: this.scrollBody.scrollTop
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "scroll";
</style>

<style>
  .pulltorefresh--ptr {
    background-color: #fbf9fe;
  }
</style>
