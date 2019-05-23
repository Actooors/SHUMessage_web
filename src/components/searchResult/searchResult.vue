<template>
  <div class="searchResult">
    <tab :line-width="2" bar-active-color="#2196F3" active-color="#2196F3" :animate=false>
      <tab-item @on-item-click="handleSwitchTab" selected>新闻</tab-item>
      <tab-item @on-item-click="handleSwitchTab">动态</tab-item>
      <tab-item @on-item-click="handleSwitchTab">圈子</tab-item>
      <tab-item @on-item-click="handleSwitchTab">用户</tab-item>
      <tab-item @on-item-click="handleSwitchTab">标签</tab-item>
    </tab>
    <div class="results">
      <!--      <div v-if="value.length===0 && itemIndex===0" class="hots">-->
      <!--        <p style="margin-left:.5rem;">热点</p>-->
      <!--        <div class="tag-box">-->
      <!--          <div class="tag" v-for="item of hots">-->
      <!--            <i class="icon-huo icon iconfont" v-if="item.hot"></i>{{item.title}}-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <div class="more">-->
      <!--          更多热门消息-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      -->
      <div v-for="card of value">
        <CommonCard :msg="card"></CommonCard>
      </div>
    </div>
  </div>
</template>

<script>
  import {Tab, TabItem} from 'vux';
  import mock from './mock';
  import CommonCard from 'components/commonCard/commonCard'

  export default {
    name: "searchResult",
    components: {Tab, TabItem,CommonCard},
    props: {
      value: {
        type: Array,
        require: true
      }
    },
    data: () => ({
      itemIndex: 0
    }),
    methods: {
      handleSwitchTab(index) {
        this.itemIndex = index;
        // console.log(index)
      }
    },
    mixins: [mock]
  }
</script>

<style lang="scss" scoped>
  @import "searchResult.scss";
</style>
