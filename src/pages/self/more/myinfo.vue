<template>
  <div class="more-wrapper">

  </div>
</template>

<script>
  import store from 'store/store'

  export default {
    name: "myinfo",
    store,
    created() {
      this.$store.commit("CHANGE_HEADER_TITLE", "我的信息")
    }
  }
</script>

<style scoped>

</style>
