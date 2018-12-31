import store from "store/store";
import {mapState} from 'vuex'


export default {
  store,
  data: () => ({
    offset: 0,
    page: 0,
    loadingMore: false,
    loadingRefresh: false,
    noMore: false
  }),
  computed: {
    ...mapState('playground', ['nodeTab', 'nodeTopBar', 'nodeTabbar', 'searchHeight'])
  },
  methods: {
    handleScroll({top}, set = false) {
      let st = top;
      let oh = this.searchHeight;//定高44px
      let ok = false;
      let tab = this.nodeTab;
      if (!(search && tab)) {
        return
      }
      //如果this.scrollTop已经开始记录了
      if (set || this.scrollTop > -1) {
        let dist = st - this.scrollTop
        //触顶了！！立刻显出搜索框全貌
        if (st <= 44) {
          this.offset = 0;
          ok = true
          //如果向下滚动的距离比较大，或者已经开始拉搜索框了，或触顶了，则拉出搜索框
        } else if ((-dist >= 30 || this.offset < oh) && this.offset > 0) {
          // this.offset = 0;//直接拉完
          this.offset += dist;//慢慢拉
          ok = true
          //向上滚动小距离，则推入搜索框
        } else if (dist > 0 && this.offset < oh) {
          // this.offset = oh;//直接推完
          this.offset += dist;//慢慢推
          ok = true
        }
        if (set || ok) {
          if (this.offset > oh) {
            this.offset = oh
          } else if (this.offset < 0) {
            this.offset = 0
          }
          search.style.position = "relative";
          tab.style.top = `${oh - this.offset}px`;
          search.style.top = `${-this.offset}px`
        }
      }
      this.scrollTop = st;
    },
    handlePulldownLoading(listApi) {
      let that = this
      if (!this.loadingRefresh) {
        this.loadingRefresh = true
        return this.xhrRequestList(listApi).finally(() => {
          setTimeout(() => {
            that.loadingRefresh = false
            this.page = 0;
            this.noMore = false;
          }, 1000)
        })
      }
    },
    handlePullupLoading(listApi) {
      // console.log("?")
      if (!this.loadingMore) {
        // console.log("yes")
        this.loadingMore = true;
        this.page++;
        return this.xhrRequestMore(listApi).finally(() => {
          setTimeout(() => {
            this.loadingMore = false
          }, 500)
        })
      }
      return Promise.resolve();
    }
  }
}
