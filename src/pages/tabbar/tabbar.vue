<template>
  <ViewBox>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <tabbar slot="bottom" v-model="selectedIndex">
      <tabbar-item link="/playground">
        <img slot="icon-active" src="../../assets/images/文档.png">
        <img slot="icon" src="../../assets/images/文档gray.png">
        <span slot="label">广场</span>
      </tabbar-item>
      <tabbar-item link="/joys">
        <img slot="icon-active" src="../../assets/images/信息.png">
        <img slot="icon" src="../../assets/images/信息gray.png">
        <span slot="label">动态</span>
      </tabbar-item>
      <button class="weui-tabbar__item plus-btn" @click="handleClickPlus"></button>
      <tabbar-item link="/find">
        <img slot="icon-active" src="../../assets/images/灵感.png">
        <img slot="icon" src="../../assets/images/灵感gray.png">
        <span slot="label">发现</span>
      </tabbar-item>
      <tabbar-item link="/self">
        <img slot="icon-active" src="../../assets/images/用户.png">
        <img slot="icon" src="../../assets/images/用户gray.png">
        <span slot="label">自己</span>
      </tabbar-item>
    </tabbar>
  </ViewBox>
</template>

<script>
  import {Tabbar, TabbarItem, XHeader, ViewBox} from 'vux'

  export default {
    name: "mainpage",
    components: {
      Tabbar,
      TabbarItem,
      XHeader,
      ViewBox
    },
    data() {
      return {
        selectedIndex: -1
      }
    },
    watch: {
      "$route"() {
        this.initData()
      }
    },
    created() {
      this.initData()
    },
    methods: {
      handleClickPlus() {
        console.log("点击了发布新动态")
      },
      initSelectedIndex() {
        // 从后向前遍历，有tabbarIndex的就更新
        let len = this.$route.matched.length
        for (let i = len - 1; i >= 0; i--) {
          Number.isInteger(this.$route.matched[i].meta.tabbarIndex) && (this.selectedIndex = this.$route.matched[i].meta.tabbarIndex)
        }
      },
      initData() {
        this.initSelectedIndex()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "tabbar";
</style>
