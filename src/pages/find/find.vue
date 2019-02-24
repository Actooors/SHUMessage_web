<template>
  <ViewBox>
    <x-header slot="header" class="theme-XHeader"
              :left-options="{showBack: false}"
              :right-options="{showMore: false}"
              id="moments-XHeader"
    >发现
    </x-header>
    <div class="img-flex">
      <div v-for="item in imgItems" @click="viewDetails(item.url)">
        <div class="bottom-info">
          <strong class="title">{{item.title}}
          </strong>
          <div class="display-info">
            <p style="float: left"><i class="iconfont" style="margin-right: 2px;vertical-align: middle">&#xe6a0;</i>{{item.heat}}℃
            </p>
            <p style="float: right;"><i class="iconfont" style="margin-right: 2px;vertical-align: middle">&#xe625;</i>{{item.comments}}
            </p>
          </div>
        </div>
        <i :style="{background:`url(${item.url}) no-repeat 0/cover`}"></i>
        <img :src="item.url">
      </div>
    </div>
  </ViewBox>
</template>

<script>
  import {ViewBox, XHeader, Search, Tab, TabItem, Scroller, Flexbox, FlexboxItem} from 'vux'
  import Scroll from 'components/scroll/scroll'
  import scrollMixin from './scrollMixin'
  import mock from './mock'
  import stickybits from 'stickybits'

  export default {
    name: "find",
    components: {...{ViewBox, XHeader, Search, Tab, TabItem, Scroller, Flexbox, FlexboxItem}, Scroll},
    data: () => ({
      searchValue: "",
      tabIndex: 0,
      showLoadIcon: true,
      imgItems: [
        {
          url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3933083456,1504476515&fm=26&gp=0.jpg',
          title: "VUX 开发者调查开发者调开发者调开发者调开发者调",
          heat: '1233',
          comments: '426'
        },
        {
          url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1270002162,3998837834&fm=26&gp=0.jpg',
          title: "VUX 开发者调查",
          heat: '1233',
          comments: '426'
        },
        {
          url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2524602711,212193926&fm=26&gp=0.jpg',
          title: "VUX 开发者调查",
          heat: '1233',
          comments: '426'
        },
        {
          url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1677996687,1384321741&fm=26&gp=0.jpg',
          title: "VUX 开发者调查",
          heat: '1233',
          comments: '426'
        },
        {
          url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3715193964,3488957786&fm=26&gp=0.jpg',
          title: "VUX 开发者调查",
          heat: '1233',
          comments: '426'
        },
        {
          url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2124043723,4106778327&fm=26&gp=0.jpg',
          title: "VUX 开发者调查",
          heat: '1233',
          comments: '426'
        },
        {
          url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3143580056,1576011344&fm=26&gp=0.jpg',
          title: "VUX 开发者调查",
          heat: '1233',
          comments: '426'
        },
        {
          url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2398260693,455559214&fm=26&gp=0.jpg',
          title: "VUX 开发者调查",
          heat: '1233',
          comments: '426'
        },
        {
          url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2906046236,3228299063&fm=26&gp=0.jpg',
          title: "VUX 开发者调查",
          heat: '1233',
          comments: '426'
        },
        {
          url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3702521294,2990570505&fm=26&gp=0.jpg',
          title: "VUX 开发者调查",
          heat: '1233',
          comments: '426'
        }
      ]
    }),
    methods: {
      handleSearch(val) {
        console.log("search", val)
      },
      viewDetails(val) {
        console.log("view_details", val)

      }
    },
    mounted() {
      setTimeout(() => {
        this.showLoadIcon = false
      }, 1000)
      stickybits('.tab-sticky')
    },
    mixins: [scrollMixin, mock]
  }
</script>

<style lang="scss" scoped>
  .tab-sticky {
    z-index: 1;
  }

  .img-flex {
    font-size: 0;
    > div {
      display: inline-flex;
      justify-content: center;
      position: relative;
      width: 50%;
      height: 200px;
      overflow: hidden;
      > img {
        height: 100%;
        width: auto;
        z-index: 1;
      }
      > i {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        filter: blur(5px) brightness(0.3);
        transform: scale(1.2);
      }
    }
  }

  .bottom-info {
    color: #fff;
    position: absolute;
    font-size: 10px;
    z-index: 2;
    left: 0;
    bottom: 0;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 3px;
    font-size: 13px;
    .title {
      font-weight: bold;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .display-info {
      width: 100%
    }
  }
</style>
