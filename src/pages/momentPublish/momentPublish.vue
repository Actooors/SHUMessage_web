<template>
  <div>
    <SelectGroup v-if="selectGroup" @on-cancel="handleCancelSelectGroup"></SelectGroup>
    <ViewBox
      v-show="!selectGroup"
      class="momentPublish-wrapper"
      body-padding-bottom="46px"
    >
      <x-header slot="header" class="theme-XHeader"
                :left-options="{showBack: true,backText:''}"
                :right-options="{showMore: false}"
      >发布新动态
        <div slot="right">
          <button class="button">发布</button>
        </div>
      </x-header>
      <div>
      <textarea
        ref="textarea"
        class="textarea"
        placeholder="SHU Message, 让纸飞机捎去你的点滴生活"
      ></textarea>
        <Group class="needsclick" gutter="0">
          <CellBox is-link @click="selectGroup=true">
            <p style="display: block">选择圈子</p>
          </CellBox>
          <CellBox is-link>
            你在哪里？
          </CellBox>
        </Group>
      </div>
    </ViewBox>
  </div>

</template>

<script>
  import {ViewBox, XHeader, Group} from 'vux'
  import CellBox from 'components/cell-box'
  import SelectGroup from 'components/selectGroup/selectGroup'
  import autosize from 'autosize'
  import stickybits from 'stickybits'

  export default {
    name: "momentPublish",
    components: {...{ViewBox, XHeader, Group}, CellBox, SelectGroup},
    data: () => ({
      selectGroup: false
    }),
    mounted() {
      autosize(this.$refs.textarea, {initOffset: 0});
      stickybits('.vux-header')
    },
    methods: {
      handleCancelSelectGroup() {
        this.$nextTick(() => {
          this.selectGroup = false;
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "momentPublish";
</style>
