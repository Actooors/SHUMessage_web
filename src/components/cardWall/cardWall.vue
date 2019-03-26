<template>
  <div class="cardWall">
    <div class="cardWall-card" v-for="item of [1,2,3,4,5,6,7,8,9,10,11,12,13,14]">
      <p>资源分享</p>
      <div class="cardWall-card-main">
        <p class="trim-overflow">筹集爱心，救助流浪猫咪！我们联合流浪猫救助站，做了一次宠物爱心公益。你在这里留下的每一个足记，都有可能挽救一只待哺的流浪猫咪！</p>
        <p class="trim-overflow">哈佛燕京图书馆中文善本特藏数字化免费开放使用</p>
        <p class="trim-overflow">《文博党建小课堂》开通试用</p>
        <span class="amount">123</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "cardWall"
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
      padding: 10px;
      background: white;
      font-size: 16px;
      display: inline-block;
      width: calc(50% - #{$margin-width*2});
      margin: $margin-width;
      box-sizing: border-box;
      border-radius: 5px;
      box-shadow: 0 0 10px 2px rgba(0, 0, 0, .1);
      &-main {
        color: rgba(0, 0, 0, 0.6);
        position: relative;
        font-size: 12px;
        .trim-overflow {
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 90%;
          white-space: nowrap;
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
