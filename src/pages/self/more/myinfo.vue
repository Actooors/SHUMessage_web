<template>
  <div class="more-wrapper">
    <group class="group1">
      <cell title="更改头像" is-link @click.native="modify" class="needsclick">
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
    <!--<div v-transfer-dom>-->
    <!--<popup v-model="modifyAvatar" height="145px" class="popup">-->
    <!--<div class="takePhoto">拍照</div>-->
    <!--<div class="fromAlbum">从手机相册选择</div>-->
    <!--<div class="cancel">-->
    <!--<div>取消</div>-->
    <!--</div>-->
    <!--</popup>-->
    <!--</div>-->
    <input type="file" accept="image/png,image/jpeg,image/gif,image/bmp" id="file" class="needsclick" ref="file">
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
    mounted() {
      document.getElementById('file').addEventListener('change', this.handleInputFile)
    },
    methods: {
      modify() {
        let evt = document.createEvent("MouseEvents");
        evt.initEvent("click", false, false);
        this.$nextTick(() => {
          this.$refs.file.dispatchEvent(evt)
        })
      },
      handleInputFile(event) {
        //只能上传一个图片
        let file = document.getElementById('file').files[0];
        if (!this.validImageFormat(file)) {
          this.$toast({text: '只能选择图片哦', type: 'warning'});
          return
        }
        if (file.size > 1024 * 1024 * 3) {
          this.$toast({text: '图片大小不能超过3M哦', type: 'warning'});
          return
        }
        let fr = new FileReader;
        fr.readAsDataURL(file);
        fr.addEventListener('load', this.handleImageLoad)
      },
      validImageFormat(file) {
        if (!file) {
          return false
        }
        let supportedFormat = ['image/png', 'image/jpeg', 'image/gif', 'image/bmp'];
        return supportedFormat.some(x => x === file.type)
      },
      handleImageLoad(e) {
        console.log(e.target.result);
        this.imgUrl = e.target.result;
        this.showImg = true;
        this.handleReplayBarResize()
      },
      delImg() {
        this.showImg = false;
        let file = document.getElementById('file');
        file.removeEventListener('change', this.handleInputFile);
        //重画元素，以使得change事件可由相同的文件触发（如果不重画元素，如果再选择相同文件将不触发change事件）
        file.outerHTML = file.outerHTML;
        document.getElementById('file').addEventListener('change', this.handleInputFile)
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "more";
</style>
<style scoped>

</style>
