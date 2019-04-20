<template>
  <div style="height:100%">
    <LocationSelectPage
      v-if="amapShow"
      v-model="amapShow"
      @confirm="handleLocaitonConfirm"
    ></LocationSelectPage>
    <div v-show="!amapShow">
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
        placeholder="让纸飞机捎去你的点滴"
      ></textarea>
          <Group class="needsclick" gutter="0">
<!--            <Cell title="选择圈子" value="" is-link @click.native="selectGroup=true"></Cell>-->
            <Cell title="你在哪里？" :value="loc.name" is-link @click.native="handleClickWhere"></Cell>
          </Group>
        </div>
      </ViewBox>
    </div>
  </div>
</template>

<script>
  import {ViewBox, XHeader, Group, Cell} from 'vux'
  import CellBox from 'components/cell-box'
  import SelectGroup from 'components/selectGroup/selectGroup'
  import autosize from 'autosize'
  import stickybits from 'stickybits'

  export default {
    name: "momentPublish",
    components: {
      ...{ViewBox, XHeader, Group, Cell},
      CellBox,
      SelectGroup,
      LocationSelectPage: () => import('components/locationSelectPage')
    },
    data: () => ({
      selectGroup: false,
      amapShow: false,
      loc: {name: ""}
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
      },
      handleClickWhere() {
        this.amapShow = true;
      },
      handleLocaitonConfirm(location) {
        this.loc = location;
        console.log(location)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "momentPublish";
</style>
