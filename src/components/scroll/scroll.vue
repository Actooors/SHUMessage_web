<template>
  <ViewBox
    v-pull-to-refresh="pulldownCallback"
    class="needsscroll"
    id="__viewBox"
    ref="viewBox"
  >
    <div>
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
      value: {
        type: Object,
        default() {
          return {
            pullupStatus: 'default',
            pulldownStatus: 'default'
          }
        }
      },
      noMore: {
        type: Boolean,
        default: false,
      },
      pulldownCallback: {
        //the function should return a promsie
        type: Function,
        required: true
      },
      pullupCallback: {
        //the function should return a promsie
        type: Function
      }
    },
    data: () => ({
      scrollerStatus: {
        pullupStatus: 'default',
        pulldownStatus: 'default'
      },
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
      handleScroll(event) {
        //position: Object{top,left}
        this.$emit('on-scroll', {top: this.scrollBody.scrollTop})
        if (
          typeof this.pullupCallback === "function"
          && !this.noMore
          && !this.loadingMore
          && this.scrollBody.scrollTop + this.scrollBody.offsetHeight >= this.scrollBody.scrollHeight * 0.8 //已经浏览完所显示的80%的评论了
        ) {
          this.loadingMore = true;
          this.pullupCallback().finally(() => {
            this.loadingMore = false;
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "scroll";
</style>
