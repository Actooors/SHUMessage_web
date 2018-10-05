<template>
  <ViewBox class="wrapper" id="__viewBox">
    <x-header slot="header" class="XHeader force-black"
              :left-options="{backText:''}">
      {{title}}
      <a slot="right" v-if="option" @click="handleClickOption">{{option}}</a>
    </x-header>
    <router-view></router-view>
  </ViewBox>
</template>

<script>
  import {ViewBox, XHeader} from 'vux'
  import store from 'store/store'

  export default {
    name: "index",
    store,
    data() {
      return {
        title: "",
        option: ""
      }
    },
    components: {
      ViewBox,
      XHeader,
    },
    watch: {
      '$route'(to) {
        this.loadMeta(to)
      }
    },
    created() {
      this.loadMeta(this.$route)
    },
    methods: {
      loadMeta(route) {
        this.title = route.meta.title
        this.option = route.meta.option
      },
      handleClickOption() {
        store.state.top.optionMethod()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "index";
</style>
<style lang="scss">
  .force-black {
    .vux-header-title, .vux-header-back, .vux-header-left, .vux-header-right {
      color: black !important;
    }
    a {
      color: black !important;
      font-size: 18px;
      line-height: 18px;
      text-align: center;
      font-weight: 400;
    }
  }
</style>
