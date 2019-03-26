<template>
  <div class="flex">
    <img :src="avatar" class="avatar" :style="{height:`${avatarSize}px`,width:`${avatarSize}px`}">
    <div>
      <p>{{uname}}</p>
      <p class="desc">{{desc}}</p>
    </div>
    <template v-if="showButton">
      <button class="button" :disable="!value" @click="handleClickButton">{{value?buttonTitles[1]:buttonTitles[0]}}
      </button>
    </template>
  </div>
</template>

<script>
  export default {
    name: "postcard",
    props: {
      avatar: String,
      uname: String,
      desc: String,
      value: {
        type: Boolean,
        default: true
      },
      avatarSize: {
        type: Number,
        default: 44
      },
      buttonTitles: {
        type: Array,
        default() {
          return ["取消关注", "关注"]
        }
      },
      showButton: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      handleClickButton() {
        this.$emit('on-click-button')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "postcard";
</style>
