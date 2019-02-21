<template>
  <div class="flex">
    <img :src="avatar" class="avatar">
    <div>
      <p>{{uname}}</p>
      <p class="desc">{{desc}}</p>
    </div>
    <button class="button" :disable="!value" @click="handleClickButton">{{value?"关注":"已关注"}}</button>
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
      }
    },
    methods: {
      handleClickButton() {
        console.log("!")
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "postcard";
</style>
