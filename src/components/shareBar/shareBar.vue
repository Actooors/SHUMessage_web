<template>
  <div :class="{shareBar:true,hr}">
    <span class="btn">
      <i class="icon-appreciate iconfont icon"></i>
      {{like}}
    </span>
    <span class="btn">
      <i class="icon-xiaoxi iconfont icon"></i>
      {{comment}}
    </span>
    <span class="btn">
      <i class="icon-fenlei iconfont icon"></i>
      {{share}}
    </span>
    <span class="forward">
      <i class="icon-fenxiang iconfont icon"></i>
    </span>
  </div>
</template>

<script>
  export default {
    name: "shareBar",
    props: ["hr", "like", "comment", "share"]
  }
</script>

<style lang="scss" scoped>
  @import "shareBar";
</style>
