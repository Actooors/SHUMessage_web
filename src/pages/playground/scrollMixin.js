import store from "store/store";
import {mapState} from 'vuex'


export default {
  store,
  data: () => ({
    scrollerStatus: {
      pullupStatus: 'default',
      pulldownStatus: 'default'
    },
    scrollHeight: "",
    slowScrollHeight: "",
    offset: 0,
    scrollTop: -1,
    page: 0,
    loadingMore: false,
    loadingRefresh: false,
    noMore: false
  }),
  mounted() {
    //这个方法应该在ajax回调的时候调用
    this.$nextTick(() => {
      this.computeScrollHeight()
    })
  },
  computed: {
    ...mapState('playground', ['nodeTab', 'nodeTopBar', 'nodeTabbar', 'searchHeight'])
  },
  methods: {
    computeScrollHeight() {
      //判断topTopBarHeight+tabbarHeight是否符合规矩
      let that = this;
      let topBarHeight;
      let tabbarHeight;

      function judgeRoute() {
        let str = that.$route.path
        return str.substring(1, str.indexOf('/', 1)) === 'playground'
      }

      function judge() {
        topBarHeight = Number(window.getComputedStyle(that.nodeTopBar)["height"].replace(/px/, ''))
        tabbarHeight = Number(window.getComputedStyle(that.nodeTabbar)["height"].replace(/px/, ''))
        return !(Number.isNaN(topBarHeight + tabbarHeight) || topBarHeight + tabbarHeight === 0)
      }

      let t = 10

      function delayHandler(callback) {
        //不在playground，不要考虑了
        if (!judgeRoute()) {
          return
        }
        if (!judge()) {
          //说明界面还没渲染好或者出现异常数据，1.25*t ms后再考虑，递归调用
          t *= 1.25
          if (that.nodeTopBar && that.nodeTabbar) {
            setTimeout(() => {
              delayHandler(callback)
            }, t)
          }
          // console.log("不通过", that.$route)
          return
        }
        callback();
      }

      delayHandler(() => {
        that.scrollHeight = (-(topBarHeight + tabbarHeight)).toString()
        that.slowScrollHeight = that.scrollHeight
        //slowScrollHeight仅在该函数追踪scrollHeight的最新变化
        // console.log(topBarHeight, tabbarHeight, that.scrollHeight)
      })
    },
    handleScroll({top}, set = false) {
      let st = top
      let oh = this.searchHeight
      let ok = false
      let tab = this.nodeTab
      if (!(search && tab)) {
        return
      }
      //如果this.scrollTop已经开始记录了
      if (set || this.scrollTop > -1) {
        let dist = st - this.scrollTop
        //触顶了！！立刻显出搜索框全貌
        if (st <= 0) {
          this.offset = 0
          ok = true
          //如果向下滚动的距离比较大，或者已经开始拉搜索框了，则拉出搜索框
        } else if ((-dist >= 40 || this.offset < oh) && this.offset > 0) {
          this.offset += dist
          ok = true
          //向上滚动，则推入搜索框
        } else if (dist > 0 && this.offset < oh) {
          this.offset += dist
          ok = true
        }
        if (set || ok) {
          if (this.offset > oh) {
            this.offset = oh
          } else if (this.offset < 0) {
            this.offset = 0
          }
          search.style.position = "relative"
          tab.style.top = `${-this.offset}px`
          tab.style.paddingTop = `${oh - this.offset}px`
          search.style.top = tab.style.top
          //搜索框高度变化的话要立刻调整scroller的高度
          !set && this.$nextTick(() => {
            let s = Number(this.slowScrollHeight) + this.offset
            if (!isNaN(s) && s) {
              this.scrollHeight = s.toString()
            }
          })
        }
      }
      this.scrollTop = st;
      //平时也要记得动态调整scroller的height，但是间隔可以大一点
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$nextTick(() => {
          this.computeScrollHeight()
        })
      }, 200)
    },
    handlePulldownLoading() {
      let that = this
      if (!this.loadingRefresh) {
        this.loadingRefresh = true
        return this.$axios({
          url: apiRoot + this.listApi,
          method: "get",
          params: {
            page: 0,
            pageSize: 20
          }
        }).then((res) => {
          //营造数据刷新的效果
          that.cards = []
          setTimeout(() => {
            that.cards = res.data.data.cards
          }, 20)
        }).catch((err) => {
          console.error(err)
        }).finally(() => {
          setTimeout(() => {
            that.loadingRefresh = false
          }, 1000)
        })
      }
    },
    handlePullupLoading() {
      console.log("?")
      if (!this.loadingMore) {
        console.log("yes")
        this.loadingMore = true
        this.page++;
        return this.$axios({
          url: apiRoot + this.listApi,
          method: "get",
          params: {
            page: this.page,
            pageSize: 20
          }
        }).then((res) => {
          if (res.data.code === 'FAILED') {
            this.$vux.toast.text(res.data.message)
            this.noMore = true;
            return
          }
          this.cards = this.cards.concat(res.data.data.cards)
        }).catch((err) => {
          console.error(err)
        }).finally(() => {
          setTimeout(() => {
            this.loadingMore = false
          }, 1000)
        })
      }
      return Promise.resolve();
    }
  }
}
