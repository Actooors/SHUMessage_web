export default {
  methods: {
    xhrRequestList(listApi){
      return this.$axios({
        url: apiRoot + listApi,
        method: "get",
        params: {
          page: 0,
          pageSize: 20
        }
      }).then((res) => {
        this.cards = res.data.data.cards
        // this.$nextTick(() => {
        //   // that.$refs.scroll.reset()
        // })
      })
    }
  }
}
