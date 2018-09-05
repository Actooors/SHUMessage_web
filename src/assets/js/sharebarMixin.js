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
    handleClickShareButton(btnIndex, msg) {
      console.log("sharebarMixin - ", arguments)
      switch (btnIndex) {
        case 0:
          handleLikeAjax(msg.info, !msg.footprint.like)
          if (msg.footprint.like) {
            --msg.shareInfo.like
          } else {
            ++msg.shareInfo.like
          }
          msg.footprint.like = !msg.footprint.like
          break;
        case 1:
          if ("handleClickCard" in this) {
            this.handleClickCard(null, msg.info)
          } else if ("maincard" in this.$refs && "handleClickCard" in this.$refs.maincard) {
            this.$refs.maincard.handleClickCard(null, msg.info)
          }
          break;
        case 3:
          this.shareOptions.url = `${window.location.protocol}//${window.location.host}/commonMsgDetail?type=${msg.info.type}&id=${msg.info.id}`
          this.shareOptions.title = "SHU Message"
          this.shareOptions.digest = `${msg.author.name}: ${msg.content}`
          // console.log(this.shareOptions)
          this.shareOptions.show = true
          break;
      }
    }
  }
}
