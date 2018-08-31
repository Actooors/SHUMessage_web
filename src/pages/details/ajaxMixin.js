export default {
  data: () => ({
    msgLoaded: false,
    msg: {
      //防止ajax之前渲染replyPlaceholder时出错
      author: {
        name: ""
      }
    }
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
      if (tryVuex && !!this.$store.state.pushRouter.cardItem) {
        //vuex里面存有状态，直接渲染
        this.msg = this.$store.state.pushRouter.cardItem
        this.msgLoaded = true
      } else {
        let {type, id} = this.$route.params
        //老老实实axios
        console.log("此处应该有ajax")
        //  ajax完成后：
        //  this.msgLoaded = true
      }
    },
  }
}
