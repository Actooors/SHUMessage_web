<template>
  <ViewBox ref="viewbox" class="profile-viewbox needsscroll" body-padding-bottom="0">
    <x-header
      slot="header"
      :left-options="{showBack: false}"
      :right-options="{showMore: false}"
      id="profile-XHeader"
    >
      <div slot="left" @click="$router.back()">
        <i class="icon-back iconfont icon"></i>
      </div>
      <div slot="right">
        <i class="icon-more iconfont icon"></i>
      </div>
      <div id="profile-XHeader-back"></div>
      <transition name="fade" mode="out-in">
        <div class="headerInfo stroke" v-show="showHeaderInfo">
          <div class="row">
            <img :src="userInfo.avatar" class="avatar">
            <div>
              <p>{{userInfo.username}}</p>
              <p>{{userInfo.starNum}}人关注</p>
            </div>
          </div>
          <button class="follow" v-if="!isUser">关注</button>
        </div>
      </transition>
    </x-header>
    <div class="content">
      <div class="gallery">
        <div class="row toprow stroke">
          <div class="avatarInfo">
            <img :src="userInfo.avatar" class="avatar" preview="0" ref="avatar">
          </div>
          <div class="modifyAvatar" v-if="isUser" @click="handleClickAvatar">
            <div @click="modifyAvatar">修改</div>
          </div>
          <div class="row" v-if="!isUser">
            <button class="chat">
              <i class="icon-message-fill iconfont icon"></i>
            </button>
            <button class="follow">
              <span>
                <i class="icon-plus iconfont icon"></i>关注
              </span>
            </button>
          </div>
        </div>
        <h1 class="username stroke">{{userInfo.username}}</h1>
        <p class="signature stroke">{{userInfo.signature}}</p>
        <div class="row stroke">
          <span class="tag" v-for="tag of userInfo.tags" :key="tag.value">{{tag.name}}</span>
        </div>
        <p class="tip stroke" v-if="!isUser">{{userInfo.tipToYou}}</p>
        <div class="gallery-bottom">
          <div @click="()=>{isUser&&$router.push('/myOwnGroup')}">
            <p class="num">{{userInfo.createGroupNum}}</p>
            <p>创建的圈子</p>
          </div>
          <div @click="()=>{isUser&&$router.push('/myGroup')}">
            <p class="num">{{userInfo.starGroupNum}}</p>
            <p>加入的圈子</p>
          </div>
          <div @click="()=>{isUser&&$router.push('/following')}">
            <p class="num">{{userInfo.starOthersNum}}</p>
            <p>{{isUser?'我':userInfo.sex==='女'?'她':'他'}}关注的人</p>
          </div>
          <div @click="()=>{isUser&&$router.push('/follower')}">
            <p class="num">{{userInfo.starNum}}</p>
            <p>关注{{isUser?'我':userInfo.sex==='女'?'她':'他'}}的人</p>
          </div>
        </div>
      </div>
      <div class="main-list">
        <div class="list-top-box">
          <div class="list-top">
            <Tab
              :line-width="2"
              v-model="tabIndex"
              custom-bar-width="25px"
              bar-active-color="#2196F3"
              active-color="#2196F3"
              class="tab"
            >
              <tab-item selected>动态</tab-item>
              <tab-item>档案</tab-item>
            </Tab>
          </div>
        </div>
        <div class="swiper">
          <div v-show="tabIndex===0">
            <Scroll
              :noMore="noMore"
              :pullupCallback="()=>loadData(true)"
              :showLoadIcon="showLoadIcon"
              body-padding-bottom="47px"
              :specificScrollBody="scrollBody"
            >
              <div class="moments-row">
              <span v-if="userInfo.likeSum!=null">
                <i class="icon-appreciate iconfont icon"></i>动态获得 {{userInfo.likeSum}} 次赞
              </span>
              </div>
              <div class="blocks">
                <div v-for="block of raw" :key="block.value" class="block">
                  <!--<user-message-card-->
                  <!--class="block-card"-->
                  <!--v-for="item of block.cards"-->
                  <!--:key="item.value"-->
                  <!--:msg="item"-->
                  <!--@onClickShareButton="handleClickShareButton(...arguments,item)"-->
                  <!--&gt;</user-message-card>-->
                  <common-card
                    v-for="(item,index) of block.cards"
                    :key="item.id"
                    :msg="item"
                    @clickTopic="$router.push({path:'/group',query:{id:item.topic.id}})"
                    @click.native="handleClickCard(index)"
                    @onClickShareButton="handleClickShareButton(...arguments,item)"
                  ></common-card>
                  <div class="block-append">
                    <router-link
                      v-if="block.blockAppend && block.blockAppend.type==='buttonLink'"
                      :to="block.blockAppend.link"
                      class="buttonLink"
                    >{{block.blockAppend.title}}
                    </router-link>
                  </div>
                </div>
              </div>
            </Scroll>

          </div>
          <div class="archives" v-show="tabIndex===1">
            <Group title="基本信息">
              <CellFormPreview :list="userInfo.basic"></CellFormPreview>
            </Group>
            <Group title="签名">
              <CellFormPreview
                class="signature-cell"
                :list="[{label:userInfo.signature,value:''}]"
              ></CellFormPreview>
            </Group>
          </div>
        </div>
      </div>
    </div>
  </ViewBox>
</template>

<script>
  import {ViewBox, XHeader, Tab, TabItem, Group, CellFormPreview} from "vux";
  import "animate.css";
  import UserMessageCard from "components/userMessageCard/userMessageCard";
  import CommonCard from "components/commonCard/commonCard";
  import mockMixin from "./mock";
  import sharebarMixin from "assets/js/sharebarMixin/index";
  import stickybits from "stickybits";
  import handleScrollMixin from '../group/handleScrollMixin'
  import Scroll from 'components/scroll/scroll'

  export default {
    name: "profile",
    mixins: [sharebarMixin, handleScrollMixin],
    components: {
      ...{ViewBox, XHeader, Tab, TabItem, Group, CellFormPreview},
      UserMessageCard,
      CommonCard,
      Scroll
    },
    data: () => ({
      isUser: false,
      tabIndex: 0,
      scrollStatus: {
        scrollTop: 0,
        lastScrollTime: 0
      },
      showHeaderInfo: false,
      stickied: false,
      userInfo: {},
      raw: [],
      noMore: false,
      showLoadIcon: true,
      page: 0,
      scrollBody: null
    }),
    mounted() {
      this.scrollBody = this.$refs.viewbox.getScrollBody();
      this.initViewBoxPropertities();
      this.$nextTick(() => {
        stickybits(".list-top-box", {stickyBitStickyOffset: 47});
      });
      this.$refs.viewbox.getScrollBody().addEventListener("scroll", this.handleScroll);
      this.handleScroll({target: this.$refs.viewbox.getScrollBody()});

      this.loadData()
    },
    methods: {
      handleClickCard(index, info) {
        if (index === null) {
          index = this.raw[0].cards.findIndex(card => card.info === info)
        }
        this.$store.commit("pushRouter/SET_CARD_ITEM", this.raw[0].cards[index])
        let that = this;
        this.$router.push({
          path: '/detail/msg',
          query: {...that.raw[0].cards[index].info, elComment: !!info}
        })
      },
      handleClickAvatar() {
        let evt = document.createEvent("MouseEvents");
        evt.initEvent("click", false, false);
        this.$nextTick(() => {
          this.$refs.avatar.dispatchEvent(evt)
        })
      },
      modifyAvatar() {
        this.$router.push('/self/more/myinfo');
        event.stopPropagation();
      },
      loadData(more = false) {
        let p1 = null;
        !more && (p1 = this.$axios({
          url: apiRoot + `/user/info/${this.$route.query.id}`
        }).then((res) => {
          const data = res.data.data;
          this.userInfo = {
            username: data.name,
            avatar: data.avator,
            sex: '男',
            starNum: data.followMe,
            createGroupNum: data.createGroupNum,
            starGroupNum: data.joinGroupNum,
            starOthersNum: data.followOthers,
            signature: data.personalLabel,
            basic: [
              {
                label: "性别",
                value: "男"
              },
              {
                label: "星座",
                value: "双鱼座"
              },
              {
                label: "所在地",
                value: "四川 - 成都"
              }
            ],
            tags: []
          };
          this.isUser = this.$userInfo().id === this.$route.query.id;
          this.page = 0;
        }));
        let p2 = this.$axios({
          url: apiRoot + `/news/userNews/${this.$route.query.id}`,
          params: {
            page: more ? this.page : 0,
            pageSize: 20
          }
        }).then((res) => {
          if (res.data.code === "FAILED") {
            this.noMore = true;
            return
          }
          const data = res.data.data;
          if (this.page === 0) {
            this.raw = [{cards: data.cards}];
          } else {
            this.raw = [{cards: [...this.raw[0].cards, ...data.cards]}];
          }
          this.page++;
          //统计like数
          // let cnt = 0;
          // data.cards.forEach((x) => {
          //   cnt += x.shareInfo.like;
          // });
          // this.userInfo.likeSum = cnt;
        });
        return Promise.all([p1, p2]).finally(() => {
          this.showLoadIcon = false;
        })
      },
      initViewBoxPropertities() {
        let e = this.$refs.viewbox.getScrollBody();
        e.style.position = "absolute";
        e.style.left = "0";
        e.style.top = "0";
        e.style.width = "100%";
      }
    },
  };
</script>

<style lang="scss" scoped>
  @import "./profile";
</style>

<style lang="scss">
  @import "../../assets/css/varies";

  #profile-XHeader {
    z-index: 1;
    padding: 3px 0 3px;
    border: none;
    #profile-XHeader-back {
      z-index: -1;
      position: absolute;
      top: -5px;
      left: 0;
      width: 100%;
      height: 52px;
      background: url('../../assets/images/background.jpg');
      background-position-x: 0;
      background-position-y: 5px;
    }
    .vux-header-left,
    .vux-header-title,
    .vux-header-right,
    .vux-header-back {
      color: $--theme-gray-light25 !important;
    }
    .vux-header-more {
      color: $--theme-gray-light25 !important;
    }
    .vux-header-title {
      margin: 0 52px !important;
    }
  }

  .signature-cell .weui-form-preview__label {
    margin-right: 0 !important;
    text-align: left !important;
    text-align-last: left !important;
  }
</style>
