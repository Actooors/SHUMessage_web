<template>
  <div class="more-wrapper">
    <group class="group1">
      <cell title="更改头像" is-link @click.native="modify">
        <img slot="icon" width="20" style="display:block;margin-right:1rem;" :src="require('assets/images/相机.png')">
        <img width="45" class="avatar" :src="require('assets/images/avatar.png')">
      </cell>
      <cell title="个性标签" is-link>
        <img slot="icon" width="20" style="display:block;margin-right:1rem;" :src="require('assets/images/标签.png')">
      </cell>
    </group>
    <group class="group2">
      <cell title="更改生日" is-link>
        <img slot="icon" width="20" style="display:block;margin-right:1rem;" :src="require('assets/images/生日.png')">
      </cell>
      <cell title="更改性别" is-link>
        <img slot="icon" width="20" style="display:block;margin-right:1rem;" :src="require('assets/images/性别.png')">
      </cell>
    </group>
    <group class="group3">
      <cell title="绑定邮箱" value="未绑定" is-link>
        <img slot="icon" width="20" style="display:block;margin-right:1rem;" :src="require('assets/images/at.png')">
      </cell>
    </group>
    <div v-transfer-dom>
      <popup v-model="modifyAvatar" height="145px" class="popup">
          <div class="takePhoto">拍照</div>
          <div class="fromAlbum">从手机相册选择</div>
          <div class="cancel">
            <div>取消</div>
          </div>
      </popup>
    </div>
  </div>
</template>

<script>
  import store from 'store/store'
  import {Cell, Group, Popup} from 'vux'

  export default {
    name: "myinfo",
    components: {Cell, Group, Popup},
    created() {
    },
    data() {
      return {
        modifyAvatar: false,
      }
    },
    methods: {
      modify() {
        this.modifyAvatar = true
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "more";
</style>
<style scoped>

</style>
