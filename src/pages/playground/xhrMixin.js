export default {
  methods: {
    xhrRequestList(listApi) {
      const that = this;
      return this.$axios({
        url: apiRoot + listApi,
        method: "get",
        params: {
          page: 0,
          pageSize: 20
        }
      }).then((res) => {
        //营造数据刷新的效果
        that.cards.length = 0;
        setTimeout(() => {
          that.cards = res.data.data.cards
        }, 20)
      })
    },
    xhrRequestMore(listApi) {
      return this.$axios({
        url: apiRoot + listApi,
        method: "get",
        params: {
          page: this.page,
          pageSize: 20
        }
      }).then((res) => {
        if (res.data.code === 'FAILED') {
          this.$toast({text: res.data.message, type: 'error'});
          this.noMore = true;
          return
        }
        this.cards = this.cards.concat(res.data.data.cards)
      }).catch((err) => {
        console.error(err)
      })
    }
  }
}
