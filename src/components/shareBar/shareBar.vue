<template>
  <div :class="{shareBar:true,hr}">
    <span class="btn" @click="handleClickShareButton(0)">
      <i class="icon-appreciate iconfont icon"></i>
      {{like}}
    </span>
    <span class="btn" @click="handleClickShareButton(1)">
      <i class="icon-xiaoxi iconfont icon"></i>
      {{comment}}
    </span>
    <span class="btn" @click="handleClickShareButton(2)">
      <i class="icon-fenlei iconfont icon"></i>
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
    props: ["hr", "like", "comment", "share"],
    methods: {
      handleClickShareButton(index) {
        this.$emit('onClickShareButton',index)
        event.stopPropagation()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "shareBar";
</style>
