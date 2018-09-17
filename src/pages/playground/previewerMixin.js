export default {
  data: () => ({
    previewerList: [],
    previewerOptions: {},
    previewerUpdateReminder: 0
  }),
  mounted() {
    this.previewerOptions = {
      getThumbBoundsFn: this.getThumbBoundsFn
    }
  },
  methods: {
    handleClickCardImg(targetArray, srcArray, index) {
      let that = this
      this.previewerList = new Array(srcArray.length)
      for (let i = 0; i < srcArray.length; i++) {
        //消除闭包影响
        let j = i;
        //求图片在target目前高度下的实际宽度
        let img = new Image();
        img.src = srcArray[j]
        img.onload = () => {
          let srcWidth = img.width / img.height * targetArray[j].offsetHeight
          img = null
          that.previewerList[j] = {
            msrc: srcArray[j],
            src: srcArray[j],
            srcWidth: srcWidth,
            target: targetArray[j]
          }
          //previewer反应总是慢一点，新增一个变量来提醒它更新引用
          that.previewerUpdateReminder++
          if (j === index) {
            setTimeout(() => {
              // console.log(that.previewerList, index)
              that.$refs.NeiborhoodPreviewer.show(index)
            }, 20)
          }
        }
      }
    },
    //previewer需要的options函数，用于计算缩略图源位置，以显示点开时的动画效果
    getThumbBoundsFn(index) {
      let thumbnail = this.previewerList[index].target
      let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
      let rect = thumbnail.getBoundingClientRect()
      let thumbnailWidth = this.previewerList[index].srcWidth
      // console.log(index, rect.left - (thumbnailWidth - rect.width) / 2)
      return {x: rect.left - (thumbnailWidth - rect.width) / 2, y: rect.top + pageYScroll, w: thumbnailWidth}
    }
  }
}
