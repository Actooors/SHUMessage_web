export default {
  data: () => ({
    previewerList: [],
    previewerTarget: null,
    previewerOptions: {},
  }),
  mounted() {
    this.previewerOptions = {
      getThumbBoundsFn: this.getThumbBoundsFn
    }
  },
  methods: {
    handleClickCardImg(target, src) {
      let img = new Image();
      img.src = src
      img.onload = () => {
        let srcWidth = img.width / img.height * target.offsetHeight
        img = null
        this.previewerList = [{
          msrc: src,
          src: src,
          srcWidth: srcWidth
        }]
        this.previewerTarget = target
        let that = this
        setTimeout(() => {
          console.log(that.$refs.NeiborhoodPreviewer)
          that.$refs.NeiborhoodPreviewer.show(0)
        }, 0)
      }

    },
    //previewer需要的options函数，用于计算缩略图源位置，以显示点开时的动画效果
    getThumbBoundsFn(index) {
      let thumbnail = this.previewerTarget
      let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
      let rect = thumbnail.getBoundingClientRect()
      let thumbnailWidth = this.previewerList[0].srcWidth
      return {x: rect.left - (thumbnailWidth - rect.width) / 2, y: rect.top + pageYScroll, w: thumbnailWidth}
    }
  }
}
