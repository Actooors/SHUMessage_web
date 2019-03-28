<template>
  <div class="cardWall">
    <div
      class="cardWall-card"
      @click="$emit('clickAdd')"
    >
      <div class="iconWrapper">
        <i class="icon-plus1 iconfont icon"></i>
      </div>
    </div>
    <div
      class="cardWall-card"
      v-for="card of cards"
      :key="card.id"
      @click="$emit('clickCard',card)"
    >
      <p class="cardWall-card-title">{{card.title}}</p>
      <div class="cardWall-card-main">
        <div class="titleWrapper">
          <p
            class="trim-overflow"
            v-for="(item, index) of card.items"
            v-if="index<3"
            :key="item.value"
          >
            {{item.title}}
          </p>
        </div>
        <span class="amount">{{card.amount}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "cardWall",
    props: {
      cards: {type: Array, required: true}
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/common";
  @import "../../assets/css/varies";

  .cardWall {
    $margin-width: 5px;
    padding: $margin-width;
    font-size: 0;
    .cardWall-card {
      font-size: 16px;
      height: 103px;
      padding: 10px;
      background: white;
      display: inline-block;
      vertical-align: top;
      width: calc(50% - #{$margin-width*2});
      margin: $margin-width;
      box-sizing: border-box;
      border-radius: 5px;
      box-shadow: 0 0 10px 2px rgba(0, 0, 0, .1);
      .iconWrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        > .iconfont {
          font-size: 32px;
          color: rgba(0, 0, 0, .4)
        }
      }
      &-main {
        color: rgba(0, 0, 0, 0.6);
        position: relative;
        font-size: 12px;
        .titleWrapper {
          height: 57px;
          .trim-overflow {
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 90%;
            white-space: nowrap;
          }
        }
        .amount {
          color: #a8a8a8d6;
          /*filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.1)); //描边*/
          font-size: 10px;
          position: absolute;
          right: -5px;
          bottom: -10px;
        }
      }
    }
  }
</style>
