<template>
  <div v-transfer-dom>
    <popup v-model="showPopup" is-transparent>
      <div class="popup">
        <div class="content">
          <p class="title">
            分享到
          </p>
          <div class="row share">
          </div>
          <div class="hr"></div>
          <ul class="row operation">
            <li class="row-li">
              <i class="icon-link iconfont icon"></i>
              <p class="tag">复制链接</p>
            </li>
            <li class="row-li">
              <i class="icon-compass iconfont icon"></i>
              <p class="tag">浏览器</p>
            </li>
          </ul>
        </div>
        <div class="cancel" @click="showPopup=false">取消</div>
      </div>
    </popup>
  </div>
</template>

<script>
  import {Popup} from 'vux'

  export default {
    name: "share",
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    components: {Popup},
    data: () => ({
      showPopup: false
    }),
    watch: {
      showPopup(val) {
        this.$emit('input', val)
      },
      value(val) {
        this.showPopup = val
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "share";
</style>
