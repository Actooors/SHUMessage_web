<template>
  <msg-detail ref="msgDetail"></msg-detail>
</template>

<script>
  import MsgDetail from "pages/msgDetails/msgDetail";

  export default {
    name: "commentDetail",
    components: {MsgDetail},
    watch: {
      '$route'(to, from) {
        // this.$refs.msgDetail.$route(to, from)
      }
    }
  }
</script>
