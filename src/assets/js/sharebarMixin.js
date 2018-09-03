import {handleLikeAjax} from 'assets/js/handleShareButtonAjax'

export default {
  methods: {
    handleClickShareButton(btnIndex, info, footprint, shareInfo) {
      console.log("sharebarMixin - ", arguments)
      if (!footprint) {
        footprint = this.msg.footprint
      }
      if (!shareInfo) {
        shareInfo = this.msg.shareInfo
      }
      switch (btnIndex) {
        case 0:
          handleLikeAjax(info, !footprint.like)
          if (footprint.like) {
            --shareInfo.like
          } else {
            ++shareInfo.like
          }
          footprint.like = !footprint.like
          break;
        case 1:
          this.handleClickCard(null, info)
          break;
      }
    }
  }
}
