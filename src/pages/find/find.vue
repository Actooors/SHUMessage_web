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
        <i :style="{background:`url() no-repeat 0/cover`}" v-lazy:background-image="item.url[0]"></i>
        <img v-lazy="`${item.url[0]}#${index}`" :preview="index" :preview-text="`${item.content}（点击查看详情）`">
        <img v-for="(img,i) in item.url" v-lazy="`${img}#${index}`" style="height:0;width:0" :preview="index" v-if="i!==0" :preview-text="`${item.content}（点击查看详情）`">
      </div>
    </div>
  </Scroll>
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
      noMore: false,
      previewerList: [],
      previewInited: false,
      imgItems: [
        {
          url: ['http://pic-bucket.ws.126.net/photo/0001/2019-02-26/E8V25O2L00AO0001NOS.jpg','http://pic-bucket.ws.126.net/photo/0001/2019-02-26/E8V25O2M00AO0001NOS.jpg','http://pic-bucket.ws.126.net/photo/0001/2019-02-26/E8V25O2N00AO0001NOS.jpg'],
          title: "金正恩抵达越南河内 民众热情迎接",
          content:'当地时间2月26日，朝鲜最高领导人金正恩抵达越南，将对越南进行正式友好访问并在河内与美国总统特朗普举行会晤。当日，朝鲜最高领导人金正恩乘坐专列抵达越南北部谅山省同登火车站，随后乘汽车前往越南首都河内。',
          heat: '2823',
          comments: '136',
          msg: {
            type: 0,
            id: 9
          }
        },
        {
          url: ['http://pic-bucket.ws.126.net/photo/0001/2019-02-25/E8RN6GIU00AP0001NOS.jpg','http://pic-bucket.ws.126.net/photo/0001/2019-02-25/E8RN6GIV00AP0001NOS.jpg','http://pic-bucket.ws.126.net/photo/0001/2019-02-25/E8RN6GJ000AP0001NOS.jpg','http://pic-bucket.ws.126.net/photo/0001/2019-02-25/E8RN6GJ100AP0001NOS.jpg'],
          title: "2万辆共享单车\"长眠\"物流园 场面壮观",
          content:'2019年2月24日，武汉市蔡甸区一块8000余平方米的物流园内，密密麻麻堆放着约2万辆红色摩拜单车，用彩条布覆盖，场面壮观。据了解，这是摩拜调减单车的存放点之一，共存放了约2万辆。',
          heat: '5038',
          comments: '2242',
          msg: {
            type: 0,
            id: 9
          }
        },
        {
          url: ['https://inews.gtimg.com/newsapp_bt/0/7153170517/1000','https://inews.gtimg.com/newsapp_bt/0/7879141442/1000','https://inews.gtimg.com/newsapp_bt/0/7873755992/1000','https://inews.gtimg.com/newsapp_bt/0/7879097248/1000','https://inews.gtimg.com/newsapp_bt/0/7879081386/1000','https://inews.gtimg.com/newsapp_bt/0/7879135379/1000','https://inews.gtimg.com/newsapp_bt/0/7873842209/1000','https://inews.gtimg.com/newsapp_bt/0/7879132047/1000',''],
          title: "宋仲基宋慧乔疑似再生隔阂，宴会同框零交流，座位距离较远",
          content:'宋仲基宋慧乔疑似再生隔阂，宴会同框零交流，座位距离较远',
          heat: '1.44W',
          comments: '7032',
          msg: {
            type: 0,
            id: 9
          }
        },
        {
          url: ['http://pic-bucket.ws.126.net/photo/0001/2019-02-23/E8NE6QF200AO0001NOS.jpg','http://pic-bucket.ws.126.net/photo/0001/2019-02-23/E8NE6QEU00AO0001NOS.jpg','http://pic-bucket.ws.126.net/photo/0001/2019-02-23/E8NE6QEV00AO0001NOS.jpg','http://pic-bucket.ws.126.net/photo/0001/2019-02-23/E8NE6QF000AO0001NOS.jpg','http://pic-bucket.ws.126.net/photo/0001/2019-02-23/E8NE6QF100AO0001NOS.jpg','http://pic-bucket.ws.126.net/photo/0001/2019-02-23/E8NE6QF300AO0001NOS.jpg','http://pic-bucket.ws.126.net/photo/0001/2019-02-23/E8NE6QF400AO0001NOS.jpg','http://pic-bucket.ws.126.net/photo/0001/2019-02-23/E8NE6QF500AO0001NOS.jpg','http://pic-bucket.ws.126.net/photo/0001/2019-02-23/E8NE6QF600AO0001NOS.jpg'],
          title: "香奈儿\"老佛爷\"葬礼在巴黎低调举办",
          content:'时尚大帝卡尔·拉格菲尔德葬礼周五在巴黎低调举办，他的很多亲朋好友现身，穿着他设计的时尚搭配，怀着沉痛的心情悼念他。他曾说过：“我不想要葬礼，我来到这世界，也将离开这世界，但我从不是它的一部分。”一路走好，天堂亦时尚! ????',
          heat: '3.89W',
          comments: '396',
          msg: {
            type: 0,
            id: 9
          }
        },
        {
          url: ['https://inews.gtimg.com/newsapp_bt/0/7880019218/1000','https://inews.gtimg.com/newsapp_bt/0/7805211262/1000'],
          title: "华为三星重仓折叠屏手机，但真能改变手机行业吗？",
          content:'2019年2月24日，在巴塞罗那MWC科技盛宴开始之前，华为率先发布了一款被命名为Mate X的折叠屏手机。这是继三星在发布Galaxy Fold不久后，全球确定即将发售的第二款折叠屏手机。华为三星重仓折叠屏手机，但真能改变手机行业吗？',
          heat: '4029',
          comments: '65',
          msg: {
            type: 0,
            id: 9
          }
        },
        {
          url: ['http://img5.cache.netease.com/photo/0001/2016-12-19/C8L0N6N55MC30001.jpg','http://img6.cache.netease.com/photo/0001/2016-12-19/C8L0N6QP5MC30001.jpg','http://img4.cache.netease.com/photo/0001/2016-12-19/C8L0N7A85MC30001.jpg','http://img4.cache.netease.com/photo/0001/2016-12-19/C8L0N7QQ5MC30001.jpg','http://img2.cache.netease.com/photo/0001/2016-12-19/C8L0N8A85MC30001.jpg','http://img5.cache.netease.com/photo/0001/2016-12-19/C8L0N8VA5MC30001.jpg','http://img3.cache.netease.com/photo/0001/2016-12-19/C8L0N9945MC30001.jpg','http://img3.cache.netease.com/photo/0001/2016-12-19/C8L0N9UB5MC30001.jpg','http://img3.cache.netease.com/photo/0001/2016-12-19/C8L0NA9I5MC30001.jpg','http://img6.cache.netease.com/photo/0001/2016-12-19/C8L0NAUE5MC30001.jpg','http://img3.cache.netease.com/photo/0001/2016-12-19/C8L0NB9J5MC30001.jpg','http://img3.cache.netease.com/photo/0001/2016-12-19/C8L0NBOS5MC30001.jpg','http://img3.cache.netease.com/photo/0001/2016-12-19/C8L0NC8M5MC30001.jpg','http://img6.cache.netease.com/photo/0001/2016-12-19/C8L0NCOF5MC30001.jpg','http://img3.cache.netease.com/photo/0001/2016-12-19/C8L0NDSS5MC30001.jpg'],
          title: "航空爱好者探索飞机墓地看飞机残骸",
          content:'对于许多人来说，拍飞机是一种极大的乐趣，当然除了拍机场或空中轰鸣而过的飞机外，还有许多人喜欢去探索一些飞机墓地，来拍摄飞机残骸中的独特美感。来自美国俄亥俄24岁的约翰尼·朱（Jonny Joo）,就拍摄了一组飞机墓地的照片，跟着他的脚步来感受下吧。',
          heat: '1233',
          comments: '2',
          msg: {
            type: 0,
            id: 9
          }
        },
        {
          url: ['http://pic-bucket.ws.126.net/photo/0001/2019-02-25/E8RRBR1K4T8E0001NOS.jpg','http://pic-bucket.ws.126.net/photo/0001/2019-02-25/E8RRBR1L4T8E0001NOS.jpg','http://pic-bucket.ws.126.net/photo/0001/2019-02-25/E8RRBR1M4T8E0001NOS.jpg','http://pic-bucket.ws.126.net/photo/0001/2019-02-25/E8RRBR1N4T8E0001NOS.jpg','http://pic-bucket.ws.126.net/photo/0001/2019-02-25/E8RRBR1O4T8E0001NOS.jpg','http://pic-bucket.ws.126.net/photo/0001/2019-02-25/E8RRBR1P4T8E0001NOS.jpg'],
          title: "二战时装备汤姆森冲锋枪的英军士兵",
          content:'1940年英国德文郡，一队英国水手用汤普森机枪和刘易斯轻机枪和李恩菲尔德步枪进行战术演练。',
          heat: '899',
          comments: '189',
          msg: {
            type: 0,
            id: 9
          }
        },
        {
          url: ['http://pic-bucket.ws.126.net/photo/0005/2019-02-26/E8UDBH094TM10005NOS.jpg','http://pic-bucket.ws.126.net/photo/0005/2019-02-26/E8UDBH074TM10005NOS.jpg','http://pic-bucket.ws.126.net/photo/0005/2019-02-26/E8UDBH084TM10005NOS.jpg','http://pic-bucket.ws.126.net/photo/0005/2019-02-26/E8UEL2RV4TM10005NOS.jpg','http://pic-bucket.ws.126.net/photo/0005/2019-02-26/E8UEL2S04TM10005NOS.jpg','http://pic-bucket.ws.126.net/photo/0005/2019-02-26/E8UEL2S14TM10005NOS.jpg','http://pic-bucket.ws.126.net/photo/0005/2019-02-26/E8UEL2S24TM10005NOS.jpg','http://pic-bucket.ws.126.net/photo/0005/2019-02-26/E8UEL2S34TM10005NOS.jpg','http://pic-bucket.ws.126.net/photo/0005/2019-02-26/E8UEL2S44TM10005NOS.jpg','http://pic-bucket.ws.126.net/photo/0005/2019-02-26/E8UEL2S54TM10005NOS.jpg','http://pic-bucket.ws.126.net/photo/0005/2019-02-26/E8UFL6PG4TM10005NOS.jpg','http://pic-bucket.ws.126.net/photo/0005/2019-02-26/E8UFL6PH4TM10005NOS.jpg','http://pic-bucket.ws.126.net/photo/0005/2019-02-26/E8UFL6PA4TM10005NOS.jpg','http://pic-bucket.ws.126.net/photo/0005/2019-02-26/E8UFL6PF4TM10005NOS.jpg','http://pic-bucket.ws.126.net/photo/0005/2019-02-26/E8UFL6PE4TM10005NOS.jpg','http://pic-bucket.ws.126.net/photo/0005/2019-02-26/E8UFL6PB4TM10005NOS.jpg','http://pic-bucket.ws.126.net/photo/0005/2019-02-26/E8UFL6P84TM10005NOS.jpg','http://pic-bucket.ws.126.net/photo/0005/2019-02-26/E8UFL6PC4TM10005NOS.jpg','http://pic-bucket.ws.126.net/photo/0005/2019-02-26/E8UFL6PD4TM10005NOS.jpg','http://pic-bucket.ws.126.net/photo/0005/2019-02-26/E8UFL6P94TM10005NOS.jpg'],
          title: "NBA常规赛：火箭119-111老鹰",
          content:'NBA常规赛：火箭119-111老鹰',
          heat: '3418',
          comments: '1577',
          msg: {
            type: 0,
            id: 9
          }
        },
        {
          url: ['http://cms-bucket.ws.126.net/2019/02/25/b09c6b3b7bb54dc3984679bee793448b.jpeg?imageView&thumbnail=550x0','http://cms-bucket.ws.126.net/2019/02/25/f47e395b62f2410886e63681f3b6c266.jpeg?imageView&thumbnail=550x0','http://cms-bucket.ws.126.net/2019/02/25/0738ae0d84cb4400a50134dd22379a6f.jpeg?imageView&thumbnail=550x0','http://cms-bucket.ws.126.net/2019/02/25/a0ad0c80aeb64e8eb8a0ed988baf5260.jpeg?imageView&thumbnail=550x0','http://cms-bucket.ws.126.net/2019/02/25/ddb0b1ea6fa34ac2ab976db0c3b09524.jpeg?imageView&thumbnail=550x0','http://cms-bucket.ws.126.net/2019/02/25/f62355808b284b88aab487cc5431b082.jpeg?imageView&thumbnail=550x0','http://cms-bucket.ws.126.net/2019/02/25/31db6c9a490a438fae68b49bdb43e8b7.jpeg?imageView&thumbnail=550x0','http://cms-bucket.ws.126.net/2019/02/25/9bbbb7bccb3e4d8cb359b5195e66c235.jpeg?imageView&thumbnail=550x0','http://cms-bucket.ws.126.net/2019/02/25/6b8970c5a43f417c87efd812f196faff.jpeg?imageView&thumbnail=550x0','http://cms-bucket.ws.126.net/2019/02/25/22624ab5e32048f3ad3dbf13e2975794.jpeg?imageView&thumbnail=550x0','http://cms-bucket.ws.126.net/2019/02/25/0070e0be01a84a77a4f73432068fd6e8.jpeg?imageView&thumbnail=550x0'],
          title: "搭载插混系统Cupra发布高性能概念SUV官图",
          content:'日前，西雅特旗下高性能子品牌Cupra正式发布了旗下概念SUV车型Formentor的官图。新车搭载插电混动系统，将于3月5日开幕的日内瓦车展上正式发布。',
          heat: '66',
          comments: '10',
          msg: {
            type: 0,
            id: 9
          }
        },
        {
          url: ['http://pic-bucket.ws.126.net/photo/0001/2019-02-18/E89TFSK400AO0001NOS.jpg','http://pic-bucket.ws.126.net/photo/0001/2019-02-18/E89TFSK300AO0001NOS.jpg','http://pic-bucket.ws.126.net/photo/0001/2019-02-18/E89TFSK200AO0001NOS.jpg','http://pic-bucket.ws.126.net/photo/0001/2019-02-18/E89TFSK100AO0001NOS.jpg'],
          title: "旅澳大熊猫沐浴洗澡 浑身泡沫萌死人",
          content:'当地时间2019年2月17日，澳大利亚阿德莱德，阿德莱德动物园里的旅澳大熊猫“网网”正在沐浴洗澡。',
          heat: '3222',
          comments: '28',
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
        this.$router.push({path: '/detail/msg', query: this.imgItems[index].msg})//点击图片文字查看详情
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
