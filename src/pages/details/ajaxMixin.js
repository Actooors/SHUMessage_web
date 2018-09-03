import axios from 'axios'

export default {
  data: () => ({
    msgLoaded: false,
    msg: {
      //防止ajax之前渲染replyPlaceholder时出错
      author: {
        name: ""
      }
    },
    raw: [],
    noMore: false,
    loadingMoreComments: false,
    page: 0
  }),
  mounted() {
    if (!this.msgLoaded) {
      // console.log("mounted")
      this.loadData()
    }
  },
  watch: {
    '$route'(to, from) {
      // console.log(this.judgePushLevel(to, from) || !this.msgLoaded)
      let pushLevelCorrect = this.judgePushLevel(to, from)
      if ((pushLevelCorrect || !this.msgLoaded)
        && to.name === this.$options.name//进入本组件路由
      ) {
        this.loadData(pushLevelCorrect)
      }
    }
  },
  methods: {
    judgePushLevel(to, from) {
      let [f, t] = [0, 0];
      //undefined默认代表level0.
      if (from.meta.pushLevel) {
        f = from.meta.pushLevel
      }
      if (to.meta.pushLevel) {
        t = to.meta.pushLevel
      }
      //push顺序没错
      return f < t
    },
    loadData(tryVuex = true) {
      let loadMessage = null
      if (tryVuex && !!this.$store.state.pushRouter.cardItem) {
        //vuex里面存有状态，直接渲染
        this.msg = this.$store.state.pushRouter.cardItem
        loadMessage = Promise.resolve()
      } else {
        //老老实实axios
        console.log("此处应该有ajax", this.$route.query)
        loadMessage = axios({
          url: apiRoot + '/common/message',
          method: "get",
          params: this.$route.query
        }).then((res) => {
          this.msg = res.data.data
          this.msgLoaded = true
        }).catch((err) => {
          console.error(err)
        })
      }
      Promise.all([loadMessage, this.loadComment()]).then(() => {
        this.msgLoaded = true
      })
    },
    loadComment() {
      return axios({
        url: apiRoot + "/comment/list",
        method: "get",
        params: {
          ...this.$route.query,
          page: 0,
          limit: [5, 10].toString()
        }
      }).then((res) => {
        if (res.data.code === "FAILED") {
          switch (res.data.message) {
            case "没有评论":
              console.log("糟了，没有评论")
              break
          }
          this.raw = []
          return
        }
        this.raw = res.data.data.raw
      }).catch((err) => {
        console.error(err)
      })
    },
    handleLoadMore() {
      //仅loadMore第二个，即最新评论
      let that = this
      if (!this.loadingMoreComments) {
        ++this.page;
        this.loadingMoreComments = true
        axios({
          url: apiRoot + "/comment/list",
          method: "get",
          params: {
            ...this.$route.query,
            page: that.page,
            limit: [0, 10].toString()
          }
        }).then((res) => {
          if (res.data.data.raw[1].cards.length === 0) {
            // console.log("nomore", res.data.data.raw)
            that.noMore = true
            return
          }
          that.raw[1].cards = that.raw[1].cards.concat(res.data.data.raw[1].cards)
          // console.log(that.raw)
        }).catch((err) => {
          console.error(err)
        }).finally(() => {
          //500ms内不要重复ajax
          setTimeout(() => {
            that.loadingMoreComments = false
          }, 500)
        })
      }
    },
    handleComment(content, img, info) {
      axios({
        url: apiRoot + '/comment/newComment',
        method: 'post',
        data: {
          ...info,
          content,
          img: img === "" ? null : img
        }
      }).then((res) => {
        if (res.data.code === 'FAILED') {
          this.$vux.toast.text(res.data.message)
        }
        this.loadComment()
      }).catch((err) => {
        console.error(err)
      })
    }
  }
}
