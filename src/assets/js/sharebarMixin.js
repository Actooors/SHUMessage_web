import {handleLikeAjax} from 'assets/js/handleShareButtonAjax'

export default {
  data: () => ({
    shareOptions: {
      show: false,
      url: "",
      title: "",
      digest: ""
    }
  }),
  methods: {
    handleClickShareButton(btnIndex, msgs) {
      console.log("sharebarMixin - ", arguments)
      //如果msg为单个msg，则转为单元素数组
      if (!('length' in msgs)) {
        msgs = [msgs]
      }
      switch (btnIndex) {
        case 0:
          handleLikeAjax(msgs[0].info, !msgs[0].footprint.like)
          for (let x of msgs) {
            if (x.footprint.like) {
              --x.shareInfo.like
            } else {
              ++x.shareInfo.like
            }
            x.footprint.like = !x.footprint.like
          }
          break;
        case 1:
          if ("handleClickCard" in this) {
            this.handleClickCard(null, msgs[0].info)
          } else if ("maincard" in this.$refs && "handleClickCard" in this.$refs.maincard) {
            this.$refs.maincard.handleClickCard(null, msgs[0].info)
          }
          break;
        case 3:
          this.shareOptions.url = `${window.location.protocol}//${window.location.host}/msgDetail?type=${msgs[0].info.type}&id=${msgs[0].info.id}`
          this.shareOptions.title = "SHU Message"
          this.shareOptions.digest = `${msgs[0].author.name}: ${msgs[0].content}`
          // console.log(this.shareOptions)
          this.shareOptions.show = true
          break;
      }
    }
  }
}
