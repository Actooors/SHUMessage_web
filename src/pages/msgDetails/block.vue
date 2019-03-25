<template>
  <div
    class="block"
  >
    <div class="justBar-box"><p class="justBar"><span class="justBar-title">{{name}}</span></p></div>
    <comment-card
      v-for="(item,index) of cards"
      :key="item.value"
      :class="{'popping':showPop[0]===blockIndex && showPop[1]===index}"
      :msg="item"
      :tick="tick"
      :show-comment="!item.target_type==='Discuss'"
      @onClickReply="handleClickReply(item)"
      @onClickLike="handleShare(0,item)"
      @onClickCard="$emit('clickCommentCard',arguments,[blockIndex,index],item)"
    ></comment-card>
  </div>
</template>

<script>
  import CommentCard from 'components/commentCard/commentCard'

  export default {
    name: "block",
    components: {CommentCard},
    props: ['cards', 'name', 'blockIndex', 'showPop'],
    data: () => ({
      tick: 0,
      timer: null
    }),
    mounted() {
      const that = this;
      this.timer = setInterval(() => {
        that.tick = Date.now()
      }, 1000);
    },
    beforeDestroy() {
      clearInterval(this.timer)
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/varies";

  .justBar-box {
    height: 48px;
    position: relative;
    background: $--background-vux;
    z-index: 1;
    .justBar {
      position: absolute;
      width: 100%;
      bottom: 0;
      font-size: 13px;
      background: white;
      height: 40px;
      line-height: 40px;
      border-bottom: $--theme-gray-light3 solid 1px;
      border-top: $--theme-gray-light4 solid 1px;
      box-shadow: 0 -5px 5px 1px rgba(0, 0, 0, 0.025); //emphasis
      .justBar-title {
        padding-left: 16px;
      }
    }
  }

  .popping {
    background-color: $--theme-gray-light4 !important;
  }
</style>
