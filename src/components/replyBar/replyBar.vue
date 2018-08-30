<template>
  <div class="replayBar">
    <div class="inputBox">
      <textarea class="input" :value="content" :placeholder="placeholder" ref="textarea"></textarea>
      <i class="icon-enter1 iconfont icon" @click="handleSubmit"></i>
    </div>

    <div class="updateImage">
      <i class="icon-image iconfont icon"></i>
      <input type="file" accept="image/png,image/jpeg,image/gif,image/bmp" id="img">
    </div>
  </div>
</template>

<script>
  import autosize from 'autosize'

  export default {
    name: "replyBar",
    props: {
      placeholder: {
        type: String,
        default: ""
      }
    },
    data: () => ({
      content: ""
    }),
    mounted() {
      autosize(this.$refs.textarea);
    },
    methods: {
      handleSubmit(event) {
        this.$emit('onSubmit')
        event.preventDefault()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "replyBar";
</style>
