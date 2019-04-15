<template>
  <ViewBox
    v-pull-to-refresh="handlePullToRefresh"
    class="needsscroll noscroll"
    ref="viewBox"
    :body-padding-bottom="bodyPaddingBottom"
  >
    <slot name="header" slot="header"></slot>
    <Spinner type="ripple" class="spinner-loadIcon" v-if="bShowLoadIcon" :style="{top:loadIconTop}"></Spinner>
    <!--这里v-else的作用，一是优化体验，二是防止白屏（我也不知道为什么白屏）-->
    <div class="scrollComponentBodyContent" v-else>
      <div class="scrollContent">
        <slot :dataArray="dataArray"></slot>
      </div>
      <div class="more-loading" v-if="loadingMore">
        <Spinner type="lines"></Spinner>
      </div>
      <LoadMore :show-loading=false tip="没有更多了" v-if="!loadingMore && bNoMore"></LoadMore>
    </div>
    <slot name="bottom" slot="bottom"></slot>
  </ViewBox>
</template>

<script>
  import {LoadMore, Spinner, ViewBox} from 'vux'
  import xhrMixin from "pages/playground/xhrMixin";
  import axios from 'axios'

  export default {
    name: "scroll",
    components: {Spinner, ViewBox, LoadMore},
    props: {
      noMore: {
        type: Boolean,
        default: false,
      },
      showLoadIcon: {
        type: Boolean,
        default: true
      },
      pulldownCallback: {
        //the function should return a promsie
        type: Function
      },
      pullupCallback: {
        //the function should return a promsie
        type: Function
      },
      bodyPaddingBottom: {
        type: String,
        default: "75px"
      },
      loadIconTop: {
        type: String,
        default: "9px"
      },
      specificScrollBody: {
        type: HTMLElement
      },
      xhrPath: String,
      xhrMethod: {
        type: String,
        default: "get"
      },
      xhrParamsFormat: Object,//{page:"pageParamName", pageSize:"pageSizeParamName"},
      xhrPageSize: Number,
      xhrDataArrayPath: {
        type: String,//"data.cards"
        default: ""
      },
      xhrNoMoreEqual: {
        type: String,//"data.code==='NoMore'"
        default: ""
      },
      xhrNoMoreTip: {
        type: String,
        default: "没有更多了"
      },
    },
    data: () => ({
      scrollBody: null,
      loadingMore: false,
      lastScrollTop: 0,
      page: 0,
      dataArray: [],
      bShowLoadIcon: this.showLoadIcon,
      bNoMore: this.noMore
    }),
    mounted() {
      this.initScroll(this.specificScrollBody);
      this.xhrPath && this.xhrLoadData();
    },
    watch: {
      specificScrollBody(val, oldVal) {
        oldVal && oldVal.removeEventListener('scroll', this.handleScroll);
        this.initScroll(val)
      },
      showLoadIcon(val) {
        this.bShowLoadIcon = val;
      },
      noMore(val) {
        this.bNoMore = val;
      }
    },
    beforeDestroy() {
      this.scrollBody.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
      initScroll(scrollBody) {
        const selfScrollBody = this.$refs.viewBox.getScrollBody();
        this.scrollBody = scrollBody || selfScrollBody;
        if (!scrollBody && selfScrollBody) {
          //如果this.scrollBody是selfScrollBody，则给予id标识，并调整style
          this.scrollBody.id = 'scrollComponentBody';
          this.scrollBody.style = this.bodyPaddingBottom === '0' ? `` : `height:calc(100% - ${this.bodyPaddingBottom})`;
        }
        this.scrollBody.addEventListener('scroll', this.handleScroll)
      },
      getScrollBody() {
        return this.$refs.viewBox.getScrollBody();
      },
      scrollTo() {
        return this.$refs.viewBox.scrollTo(...arguments);
      },
      async handleScroll(event) {
        const that = this;
        //position: Object{top,left}
        this.$emit('on-scroll', {top: event.target.scrollTop});
        let delta = event.target.scrollTop - this.lastScrollTop;

        //可以loadMore了
        if (
          !this.bNoMore
          && !this.loadingMore
          && event.target.scrollTop + event.target.offsetHeight >= event.target.scrollHeight * 0.8 //已经浏览完所显示的80%的评论了
          && delta > 0
        ) {
          this.loadingMore = true;
          //看看是否托付了xhr
          let p1, p2;
          if (this.xhrPath) {
            p1 = this.xhrLoadData(false)
          }
          if (typeof this.pullupCallback === "function") {
            //调用pullupCallback
            let f = this.pullupCallback(function callback() {
              that.loadingMore = false;
            });
            if (f && typeof f.then === "function") {
              p2 = f;
            }
          }
          Promise.all([p1, p2]).finally(() => {
            this.loadingMore = false;
          })
        }
        // console.log("commit", this.scrollBody.scrollTop)
        this.lastScrollTop = event.target.scrollTop;
      },
      xhrLoadData(reload = true) {
        const that = this;
        const params = {
          [this.xhrParamsFormat.pageSize]: this.xhrPageSize
        };
        if (reload) {
          this.page = params[this.xhrParamsFormat.page] = 0;
        } else {
          this.page = params[this.xhrParamsFormat.page] = this.page + 1;
        }

        const findPath = function (root, path) {
          const arr = path.split('.');
          let tmp = root;
          for (let i = 0; i < arr.length; i++) {
            tmp = tmp[arr[i]];
          }
          return tmp;
        };
        return axios({
          url: that.xhrPath,
          method: that.xhrMethod,
          params
        }).then((res) => {
          const equal = "res.data." + this.xhrNoMoreEqual;
          console.log(eval(equal));
          if (eval(equal)) {
            that.$toast({text: that.xhrNoMoreTip, type: 'error'});
            that.bNoMore = true;
          } else {
            if (reload) {
              that.dataArray = findPath(res.data, that.xhrDataArrayPath);
            } else {
              that.dataArray.push(...findPath(res.data, that.xhrDataArrayPath));
            }
          }
          console.log(that.dataArray)
        }).finally(() => {
          that.bShowLoadIcon = false;
          that.$emit('afterLoaded')
        })
      },
      handlePullToRefresh() {
        //看看是否托付了xhr
        let p1, p2;
        if (this.xhrPath) {
          p1 = this.xhrLoadData(true)
        }
        if (typeof this.pulldownCallback === "function") {
          //调用pulldownCallback
          let f = this.pulldownCallback(...arguments);
          if (f && typeof f.then === "function") {
            p2 = f;
          }
        }
        return Promise.all([p1, p2]);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "scroll";
</style>

<style>
  .pulltorefresh--ptr {
    background-color: #fbf9fe;
  }

  .scrollComponentBodyContent {
    height: 100%;
  }
</style>
