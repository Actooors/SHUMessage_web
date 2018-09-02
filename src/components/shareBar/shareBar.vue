<template>
  <div :class="{shareBar:true,hr}">
    <span class="btn" @click="handleClickShareButton(0)">
      <i :class="`icon-appreciate iconfont icon${footprint.like?' icon-done':''}`"></i>
      {{like}}
    </span>
    <span class="btn" @click="handleClickShareButton(1)">
      <i :class="`icon-xiaoxi iconfont icon${footprint.comment?' icon-done':''}`"></i>
      {{comment}}
    </span>
    <span class="btn" @click="handleClickShareButton(2)">
      <i :class="`icon-fenlei iconfont icon${footprint.forward?' icon-done':''}`"></i>
      {{share}}
    </span>
    <span class="share" @click="handleClickShareButton(3)">
      <i class="icon-fenxiang iconfont icon"></i>
    </span>
  </div>
</template>

<script>
  export default {
    name: "shareBar",
    props: ["hr", "like", "comment", "share", "footprint"],
    methods: {
      handleClickShareButton(index) {
        this.$emit('onClickShareButton', index)
        event.stopPropagation()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "shareBar";
</style>
