<template>
  <Scroll
    :noMore="noMore"
    :pulldownCallback="handlePulldownCallback"
    :pullupCallback="handlePullupCallback"
    :showLoadIcon="showLoadIcon"
  >
    <x-header slot="header" class="theme-XHeader"
              :left-options="{showBack: false}"
              :right-options="{showMore: false}"
              id="moments-XHeader"
    >发现
    </x-header>
    <div class="img-flex">
      <div v-for="(item,index) in imgItems" @click="viewDetails(item.url)">
        <div class="bottom-info">
          <div class="title">{{item.title}}
          </div>
          <div class="display-info">
            <p style="float: left"><i class="iconfont" style="margin-right: 2px;vertical-align: middle">&#xe6a0;</i>{{item.heat}}℃
            </p>
            <p style="float: right;"><i class="iconfont" style="margin-right: 3px;vertical-align: middle">&#xe625;</i>{{item.comments}}
            </p>
          </div>
        </div>
        <i :style="{background:`url() no-repeat 0/cover`}" v-lazy:background-image="item.url"></i>
        <img v-lazy="`${item.url}#${index}`" :preview="index" :preview-text="item.title">
      </div>
    </div>
  </Scroll>
</template>

<script>
  import {Previewer, ViewBox, XHeader, Search, Tab, TabItem, Scroller, Flexbox, FlexboxItem} from 'vux'
  import Scroll from 'components/scroll/scroll'
  import scrollMixin from './scrollMixin'
  import mock from './mock'
  import stickybits from 'stickybits'

  export default {
    name: "find",
    components: {...{Previewer, ViewBox, XHeader, Search, Tab, TabItem, Scroller, Flexbox, FlexboxItem}, Scroll},
    data: () => ({
      searchValue: "",
      tabIndex: 0,
      showLoadIcon: true,
      noMore: false,
      previewerList: [],
      previewInited: false,
      imgItems: [
        {
          url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3933083456,1504476515&fm=26&gp=0.jpg',
          title: "VUX 开发者调查开发者调开发者调开发者调开发者调",
          heat: '1233',
          comments: '426',
          msg: {
            type: 0,
            id: 9
          }
        },
        {
          url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1270002162,3998837834&fm=26&gp=0.jpg',
          title: "钢铁侠好看图片",
          heat: '503',
          comments: '10',
          msg: {
            type: 0,
            id: 9
          }
        },
        {
          url: 'https://n.sinaimg.cn/news/transform/579/w340h239/20190224/YOHX-htknpmi2407787.jpg',
          title: "美国总统特朗普会见刘鹤 现场气氛融洽",
          heat: '500W',
          comments: '102W',
          msg: {
            type: 0,
            id: 9
          }
        },
        {
          url: 'https://n.sinaimg.cn/news/transform/60/w520h340/20190130/Ljbd-hshmsti4278270.png',
          title: "西安副市长回应“网红城市” ：“我们不红 始皇不容”",
          heat: '1233',
          comments: '426',
          msg: {
            type: 0,
            id: 9
          }
        },
        {
          url: 'http://n.sinaimg.cn/edu/11_img/upload/cf89c528/700/w900h600/20180817/feVT-hhvciiw4592611.jpg',
          title: "组图：烈日下的新生军训 只为锻炼身体磨练意志",
          heat: '1233',
          comments: '426',
          msg: {
            type: 0,
            id: 9
          }
        },
        {
          url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2124043723,4106778327&fm=26&gp=0.jpg',
          title: "VUX 开发者调查",
          heat: '1233',
          comments: '426',
          msg: {
            type: 0,
            id: 9
          }
        },
        {
          url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3143580056,1576011344&fm=26&gp=0.jpg',
          title: "VUX 开发者调查",
          heat: '1233',
          comments: '426',
          msg: {
            type: 0,
            id: 9
          }
        },
        {
          url: 'http://img1.imgtn.bdimg.com/it/u=4183263680,2554962051&fm=15&gp=0.jpg',
          title: "副省长落马，省委书记连发6问",
          heat: '1233',
          comments: '426',
          msg: {
            type: 0,
            id: 9
          }
        },
        {
          url: 'http://img0.imgtn.bdimg.com/it/u=1096712855,2802578479&fm=15&gp=0.jpg',
          title: "张泉灵个人简介",
          heat: '1233',
          comments: '426',
          msg: {
            type: 0,
            id: 9
          }
        },
        {
          url: 'http://www.chinanews.com/2019/02-24/U86P4T8D8763365F5012DT20190224183123.jpg',
          title: "兴凯湖坚冰融化",
          heat: '1233',
          comments: '422226',
          msg: {
            type: 0,
            id: 9
          }
        }
      ]
    }),
    methods: {
      handleSearch(val) {
        console.log("search", val)
      },
      viewDetails(val) {
        console.log("view_details", val)
        console.log("!@#@")
        // this.previewerList.push(val)
      },
      handlePulldownCallback(callback) {
        setTimeout(() => {
          callback();
        }, 500)
      },
      handlePullupCallback(callback) {
        const that = this;
        setTimeout(() => {
          callback();
          that.noMore = true;
        }, 500)
      },
      handleClickPreviewText(index, close) {
        close();
        this.$router.push({path: '/detail/msg', query: this.imgItems[index].msg})
      }
    },
    mounted() {
      this.$preview.on('imageLoadComplete', (e, item) => {
        if (!this.previewInited) {
          this.$preview.self.framework.bind(this.$preview.self.scrollWrap /* bind on any element of gallery */, 'pswpTap', (e) => {
            if (e.target.classList.contains('pswp__caption__center')) {
              let index = this.$preview.self.currItem.src.substring(this.$preview.self.currItem.src.lastIndexOf('#') + 1);
              this.handleClickPreviewText(index, this.$preview.self.close);
            }
          });
          this.previewInited = true;
        }
      });
      // this.$preview.on('pswpTap', (e) => {
      //   console.log('tap', e, e.detail);
      // });
      setTimeout(() => {
        this.showLoadIcon = false
      }, 1000);
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
        filter: blur(4.5px) brightness(0.4);
        transform: scale(1.2);
      }
    }
  }

  .bottom-info {
    color: #fff9fb;
    background: linear-gradient(to top, rgba(0, 0, 0, .8), rgba(0, 0, 0, .5), transparent);
    position: absolute;
    font-size: 10px;
    z-index: 2;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 20px 10px 5px;
    font-size: 13px;
    .title {
      font-weight: bold;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .display-info {
      width: 100%;
    }
  }
</style>
