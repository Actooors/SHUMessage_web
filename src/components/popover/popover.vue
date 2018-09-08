<template>
  <div>
    <span>
      <slot>
      </slot>
    </span>
    <div
      class="vux-popover"
      v-transfer-dom
      ref="popover"
      :style="pos"
      v-show="value">
      <div :class="arrowClass" :style="{right: `${gutter}px`}"></div>
      <div @click="$emit('on-click-content')">
        <slot name="content">
          <div v-html="content"></div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
  import ClickOutside from 'vux/src/directives/click-outside'
  import TransferDom from 'vux/src/directives/transfer-dom'

  export default {
    name: 'popover',
    directives: {
      TransferDom,
      ClickOutside
    },
    props: {
      content: String,
      placement: String,
      gutter: {
        type: Number,
        default: 5
      },
      pos: {
        type: Object,
        default: {
          right: 0,
          bottom: 0
        }
      },
      value: {
        type: Boolean
      }
    },
    computed: {
      arrowClass() {
        return {
          'vux-popover-arrow': true,
          'vux-popover-arrow-up': this.placement === 'bottom',
          'vux-popover-arrow-right': this.placement === 'left',
          'vux-popover-arrow-left': this.placement === 'right',
          'vux-popover-arrow-down': this.placement === 'top'
        }
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/variable.less';

  .vux-popover {
    position: absolute;
    background-color: @popover-bg-color;
    color: @popover-font-color;
    border-radius: @popover-border-radius;
    z-index: 500;
  }

  .vux-popover-arrow {
    position: absolute;
    width: 0;
    height: 0;
  }

  .vux-popover-arrow-up {
    border-left: @popover-border-width solid transparent;
    border-right: @popover-border-width solid transparent;
    border-bottom: @popover-border-width solid @popover-bg-color;
    left: 50%;
    transform: translateX(-50%);
    top: -@popover-border-width;
  }

  .vux-popover-arrow-down {
    border-left: @popover-border-width solid transparent;
    border-right: @popover-border-width solid transparent;
    border-top: @popover-border-width solid @popover-bg-color;
    bottom: -@popover-border-width;
  }

  .vux-popover-arrow-left {
    border-top: @popover-border-width solid transparent;
    border-bottom: @popover-border-width solid transparent;
    border-right: @popover-border-width solid @popover-bg-color;
    top: 50%;
    transform: translateY(-50%);
    left: -@popover-border-width;
  }

  .vux-popover-arrow-right {
    border-top: @popover-border-width solid transparent;
    border-bottom: @popover-border-width solid transparent;
    border-left: @popover-border-width solid @popover-bg-color;
    top: 50%;
    transform: translateY(-50%);
    right: -@popover-border-width;
  }
</style>
