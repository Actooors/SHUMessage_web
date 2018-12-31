<template>
  <div>
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="child-view"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        transitionName: 'slide-left'
      }
    },
    beforeRouteUpdate(to, from, next) {
      if (this.$router.isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false;
      next()
    }
  }
</script>

<style scoped>
  .child-view {
    position: absolute;
    transition: all .4s cubic-bezier(.55, 0, .1, 1);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fbf9fe;
    will-change: transform;
  }

  .slide-left-enter, .slide-right-leave-active {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
    z-index: 1;
  }

  .slide-left-leave-active, .slide-right-enter {
    -webkit-transform: translateX(-50px);
    transform: translateX(-50px);
    z-index: -1;
  }

  .header {
    position: absolute;
    height: 44px;
    width: 100%
  }
</style>
