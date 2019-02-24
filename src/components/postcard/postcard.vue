<template>
  <div class="flex">
    <img :src="avatar" class="avatar" :style="{height:`${avatarSize}px`,width:`${avatarSize}px`}">
    <div>
      <p>{{uname}}</p>
      <p class="desc">{{desc}}</p>
    </div>
    <button class="button" :disable="!value" @click="handleClickButton" v-if="!buttonTitle">{{value?"关注":"已关注"}}</button>
    <button class="button" :disable="!value" @click="handleClickButton" v-else>{{buttonTitle}}</button>
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
      buttonTitle: String
    },
    methods: {
      handleClickButton() {
        console.log("!");
        this.$emit('on-click-button')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "postcard";
</style>
