<template>
  <div class="replayBar" ref="replayBar">
    <div class="inputBox">
      <textarea
        class="input needsclick needsscroll"
        v-model="content"
        :placeholder="placeholder"
        id="textarea"
        @input="handleReplayBarResize"
        ref="textarea"
      ></textarea>
      <!--<div-->
      <!--ref="textarea"-->
      <!--id="textarea"-->
      <!--class="input needsclick needsfocus"-->
      <!--contenteditable="true"-->
      <!--@input="handleReplayBarResize"-->
      <!--aria-placeholder="sadf"></div>-->
      <i
        class="icon-enter1 iconfont icon"
        @click="handleSubmit"
        v-show="content.length>0"
      ></i>
    </div>
    <popover
      placement="top"
      :gutter=18
      ref="popover"
      :pos="{bottom:`${popBottom+5}px`,right:`5px`}"
      v-model="showImg"
    >
      <div slot="content" class="popover-content">
        <div
          class="img"
          v-if="showImg"
          :style="{backgroundImage:`url(${imgUrl})`}"
        >
          <i
            class="iconfont icon"
            @click="delImg"
          ></i>
        </div>
      </div>
      <div class="updateImage">
        <i class="icon-image iconfont icon"></i>
        <input type="file" accept="image/png,image/jpeg,image/gif,image/bmp" id="file">
      </div>
    </popover>
  </div>
</template>

<script>
  import autosize from 'autosize'
  //Popover改自vux以适应项目
  import Popover from 'components/popover/popover'
  import {ViewBox} from 'vux'

  export default {
    name: "replyBar",
    components: {Popover, ViewBox},
    props: {
      placeholder: {
        type: String,
        default: ""
      }
    },
    data: () => ({
      content: "",
      imgUrl: "",
      showImg: false,
      popBottom: 48
    }),
    mounted() {
      autosize(this.$refs.textarea);
      this.$refs.textarea.addEventListener("touchstart", event => event.stopPropagation())
      document.getElementById('file').addEventListener('change', this.handleInputFile)
    },
    methods: {
      handleReplayBarResize() {
        this.$nextTick(() => {
          this.popBottom = Number(window.getComputedStyle(this.$refs.replayBar)['height'].replace(/px/, ''))
        })
      },
      handleSubmit(event) {
        this.$emit('onSubmit', this.content, this.imgUrl)
        this.content = ""
        this.imgUrl = ""
        this.showImg = false
        event.preventDefault()
      },
      handleInputFile(event) {
        //只能上传一个图片
        let file = document.getElementById('file').files[0];
        if (!this.validImageFormat(file)) {
          this.$vux.toast.text('只能选择图片哦')
          return
        }
        if (file.size > 1024 * 1024 * 3) {
          this.$vux.toast.text('图片大小不能超过3M哦')
          return
        }
        let fr = new FileReader
        fr.readAsDataURL(file)
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
        console.log(e.target.result)
        this.imgUrl = e.target.result
        this.showImg = true
        this.handleReplayBarResize()
      },
      delImg() {
        this.showImg = false
        let file = document.getElementById('file')
        file.removeEventListener('change', this.handleInputFile)
        //重画元素，以使得change事件可由相同的文件触发（如果不重画元素，如果再选择相同文件将不触发change事件）
        file.outerHTML = file.outerHTML
        document.getElementById('file').addEventListener('change', this.handleInputFile)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "replyBar";
</style>
