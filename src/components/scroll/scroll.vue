<template>
  <scroller lock-x
            scrollbar-y
            use-pulldown
            use-pullup
            @on-pulldown-loading="handlePulldownLoading"
            @on-pullup-loading="handlePullupLoading"
            v-model="scrollerStatus"
            :height="height"
            ref="scroller"
            @on-scroll="handleScroll"
  >
    <div>
      <slot></slot>
    </div>
    <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down">
      <span v-show="scrollerStatus.pulldownStatus === 'default'"></span>
      <span class="pulldown-arrow"
            v-show="scrollerStatus.pulldownStatus === 'down' || scrollerStatus.pulldownStatus === 'up'"
            :class="{'rotate': scrollerStatus.pulldownStatus === 'up'}"><x-icon type="ios-circle-outline"
                                                                                size="18"
                                                                                class="xicon-circle-outline"></x-icon></span>
      <span v-show="scrollerStatus.pulldownStatus === 'loading'"><spinner type="ripple"></spinner></span>
    </div>
    <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up">
      <span v-show="scrollerStatus.pullupStatus === 'default'"></span>
      <span class="pullup-arrow"
            v-show="scrollerStatus.pullupStatus === 'down' || scrollerStatus.pullupStatus === 'up'"
            :class="{'rotate': scrollerStatus.pullupStatus === 'up'}"><i
        class="icon-threedots iconfont icon"></i></span>
      <span v-show="scrollerStatus.pullupStatus === 'loading'"><spinner type="dots"></spinner></span>
    </div>
  </scroller>
</template>

<script>
  import {Scroller, Spinner} from 'vux'

  export default {
    name: "scroll",
    components: {Scroller, Spinner},
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
      height: {
        type: String
      },
      onPulldownLoading: {
        type: Function
      },
      onPullupLoading: {
        type: Function
      },
      onScroll: {
        type: Function
      }
    },
    data: () => ({
      scrollerStatus: {
        pullupStatus: 'default',
        pulldownStatus: 'default'
      },
    }),
    mounted() {

    },
    watch: {
      scrollerStatus(val) {
        this.$emit('input', val)
      },
      value(val) {
        // console.log("?")
        this.scrollerStatus = val
      }
    },
    methods: {
      handlePulldownLoading() {
        this.$emit('on-pulldown-loading')
      },
      handlePullupLoading() {
        this.$emit('on-pullup-loading')
      },
      handleScroll(position) {
        //position: Object{top,left}
        this.$emit('on-scroll', position)
      },
      donePulldown() {
        this.$refs.scroller.donePulldown()
      },
      donePullup() {
        this.$refs.scroller.donePullup()
      },
      reset() {
        this.$refs.scroller.reset(...arguments)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "scroll";
</style>
