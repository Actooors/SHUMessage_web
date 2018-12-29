export default {
  data: () => ({
    scrollHeight: ""
  }),
  mounted(){
    this.$nextTick(()=>{
      this.initScrollHeight()
    })
  },
  methods: {
    initScrollHeight() {
      let tabbarHeight = Number(window.getComputedStyle(document.getElementById('tabbar'))['height'].replace(/px/,''))
      let headerHeight = Number(window.getComputedStyle(document.getElementById('topBar'))['height'].replace(/px/,''))
      this.scrollHeight = (-(tabbarHeight + headerHeight)).toString()
    },
    handlePulldownLoading() {
      console.log("pulldown")
      setTimeout(() => {
      }, 1000)
    },
    handlePullupLoading() {
      console.log("pullup")
      setTimeout(() => {
      }, 1000)
    }
  }
}
