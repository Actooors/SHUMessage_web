<template>
  <Search
    placeholder="搜索更多圈子"
    cancel-text="返回"
    @on-cancel="handleCancel"
    ref="search"
  >
    <div class="flex">
      <ul class="leftul needsclick" @click="handleClickLeftUL">
        <li class="selected">推荐</li>
        <li>已加入</li>
        <li>已加入</li>
        <li>已加入</li>
        <li>已加入</li>
        <li>已加入</li>
        <li>已加入</li>
        <li>已加入</li>
        <li>已加入</li>
        <li>已加入</li>
        <li>已加入</li>
        <li>已加入</li>
        <li>已加入</li>
      </ul>
      <div class="rightdiv">
        <Group title="默认">
          <CellBox is-link :arrow=false>
            <postcard avatar="https://avatars3.githubusercontent.com/u/559179?s=460&v=4"
                      uname="不发到任何圈子"
                      button-title="详情"
                      :avatar-size=32
                      class="postcard"
            ></postcard>
          </CellBox>
        </Group>
        <Group title="为你推荐">
          <CellBox is-link :arrow=false>
            <postcard avatar="https://avatars3.githubusercontent.com/u/559179?s=460&v=4"
                      uname="JitHub"
                      button-title="详情"
                      :avatar-size=32
                      class="postcard"
            ></postcard>
          </CellBox>
        </Group>
      </div>
    </div>
  </Search>
</template>

<script>
  import {Group} from 'vux'
  import postcard from 'components/postcard/postcard'
  import Search from 'components/search'
  import CellBox from 'components/cell-box'

  export default {
    name: "selectGroup",
    components: {Search, Group, postcard, CellBox},
    mounted() {
      const that = this;
      this.$refs.search.setFocus();
      this.$nextTick(() => {
        that.$refs.search.setBlur();
      })
    },
    methods: {
      handleClickLeftUL(event) {
        if (event.target.tagName.toLowerCase() === 'li' && !event.target.classList.contains('selected')) {
          for (let e of event.target.parentElement.children) {
            e.classList.contains('selected') && e.classList.remove('selected')
          }
          event.target.classList.add('selected')
        }
      },
      handleCancel() {
        this.$emit('on-cancel');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/varies";

  .flex {
    display: flex;
  }

  .leftul {
    flex-shrink: 0;
    font-size: 14px;
    height: calc(100vh - 44px);
    overflow-y: auto;
    li {
      text-align: center;
      background: $--background-deep;
      padding: 1em;
      &.selected {
        background: white;
      }
    }
  }

  .rightdiv {
    flex-grow: 1;
    .postcard {
      font-size: 14px;
    }
  }
</style>
<style lang="scss">
  .rightdiv .vux-cell-box {
    padding: 10px 15px !important;
  }
</style>
