<template>
  <div class="more-wrapper">
    <group class="group1">
      <cell title="更改头像" is-link>
        <img slot="icon" width="20" style="display:block;margin-right:1rem;" :src="require('assets/images/相机.png')">
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
  </div>
</template>

<script>
  import store from 'store/store'
  import {Cell, Group} from 'vux'

  export default {
    name: "myinfo",
    created() {
    },
    data() {
      return {}
    },
    components: {Cell, Group}
  }
</script>
<style lang="scss" scoped>
  @import "more";
</style>
<style scoped>

</style>
