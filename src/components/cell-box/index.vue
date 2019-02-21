<template>
  <div
    class="vux-cell-box weui-cell"
    :class="className"
    :style="style"
    @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
  import {go} from 'vux/src/libs/router'

  export default {
    name: 'cell-box',
    props: {
      isLink: Boolean,
      link: [String, Object],
      borderIntent: {
        type: Boolean,
        default: true
      },
      noFlex: Boolean,
      alignItems: String,
      arrow: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      style() {
        if (this.alignItems) {
          return {
            'align-items': this.alignItems
          }
        }
      },
      className() {
        return {
          'vux-tap-active': this.isLink || !!this.link,
          'weui-cell_access': (this.isLink || !!this.link) && this.arrow,
          'vux-cell-no-border-intent': !this.borderIntent,
          'needsclick': true
        }
      }
    },
    methods: {
      onClick() {
        this.link && go(this.link, this.$router)
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/variable.less';
  @import '~vux/src/styles/tap.less';
  @import '~vux/src/styles/weui/base/mixin/setArrow.less';
  @import '~vux/src/styles/weui/widget/weui_cell/weui_cell_global';

  .vux-cell-primary {
    flex: 1;
  }

  .weui-cell.vux-cell-no-border-intent:before {
    left: 0;
  }
</style>
