<template>
  <ViewBox
    v-pull-to-refresh="pulldownCallback"
    class="needsscroll"
    id="__viewBox"
    ref="viewBox"
    :height="scrollTop"
    :body-padding-bottom="bodyPaddingBottom"
  >
    <Spinner type="ripple" class="spinner" v-show="showLoadIcon"></Spinner>
    <div class="body">
      <slot></slot>
    </div>
    <div class="loading" v-if="loadingMore">
      <Spinner type="lines"></Spinner>
    </div>
    <LoadMore :show-loading=false tip="没有更多了" v-if="noMore"></LoadMore>
  </ViewBox>
</template>

<script>
  import {Spinner, ViewBox, LoadMore} from 'vux'

  export default {
    name: "scroll",
    components: {Spinner, ViewBox, LoadMore},
    props: {
      scrollTop: {
        type: String,
        default: "0"
      },
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
        default: "32px"
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
    watch: {},
    methods: {
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
