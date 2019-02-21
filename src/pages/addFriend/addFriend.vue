<template>
  <ViewBox
    class="momentPublish-wrapper"
    body-padding-bottom="46px"
  >
    <x-header slot="header" class="theme-XHeader"
              :left-options="{showBack: true,backText:''}"
              :right-options="{showMore: false}"
    >发现校友
      <div slot="right">
        <x-icon type="ios-search-strong" size="24"></x-icon>
      </div>
    </x-header>
    <div>
      <Group class="needsclick" title="校友推荐">
        <CellBox is-link :arrow=false>
          <postcard avatar="https://avatars3.githubusercontent.com/u/559179?s=460&v=4"
                    uname="谷歌"
                    desc="这是一个人"
          ></postcard>
        </CellBox>
        <CellBox is-link :arrow=false>
          <postcard avatar="https://avatars3.githubusercontent.com/u/559179?s=460&v=4"
                    uname="谷歌"
                    desc="这是一个人"
          ></postcard>
        </CellBox>
        <CellBox is-link :arrow=false>
          <postcard avatar="https://avatars3.githubusercontent.com/u/559179?s=460&v=4"
                    uname="谷歌"
                    desc="这是一个人"
          ></postcard>
        </CellBox>
        <CellBox is-link :arrow=false>
          <postcard avatar="https://avatars3.githubusercontent.com/u/559179?s=460&v=4"
                    uname="谷歌"
                    desc="这是一个人"
          ></postcard>
        </CellBox>
      </Group>
    </div>
  </ViewBox>
</template>

<script>
  import {ViewBox, XHeader, Group} from 'vux'
  import postcard from 'components/postcard/postcard'
  import CellBox from 'components/cell-box'
  import autosize from 'autosize'
  import stickybits from 'stickybits'

  export default {
    name: "addFriend",
    components: {...{ViewBox, XHeader, Group}, CellBox, postcard},
    mounted() {
      autosize(this.$refs.textarea, {initOffset: 0});
      stickybits('.vux-header')
    }
  }
</script>

<style lang="scss" scoped>
  @import "addFriend";
</style>
