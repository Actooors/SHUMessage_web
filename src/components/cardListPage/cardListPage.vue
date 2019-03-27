<template>
  <div style="background: white;height:100%">
    <Search
      ref="search"
      v-if="searchShow"
      @on-cancel="searchShow=false"
      v-model="searchValue"
      @on-change="handleSearch"
      :placeholder="searchPlaceholder"
      cancel-text="返回"
    >
      <template v-if="searchValue.length>0">
        <Group class="needsclick" :gutter=0 :title="groupTitle||title">
          <CellBox
            is-link
            :arrow=false
            v-for="(user,index) of starList"
            v-if="user.name.indexOf(searchValue)!==-1"
            :key="user.id"
            @click.native="handleClickCellBox(user)"
          >
            <postcard :avatar="user.avatar"
                      :uname="user.name"
                      :desc="user.about"
                      :showButton=false
            ></postcard>
          </CellBox>
        </Group>
        <Group class="needsclick" :gutter=0 title="更多结果">
          <CellBox
            is-link
            :arrow=false
            v-for="(user,index) of searchResult"
            :key="user.id"
            @click.native="handleClickCellBox(user)"
          >
            <postcard :avatar="user.avatar"
                      :uname="user.name"
                      :desc="user.about"
                      :showButton=false
            ></postcard>
          </CellBox>
        </Group>
      </template>
      <div class="logoWrapper">
        <img src="/static/logo.png" height="200" class="logo">
      </div>
    </Search>
    <ViewBox
      v-else
      class="momentPublish-wrapper"
      body-padding-bottom="46px"
    >
      <x-header slot="header" class="theme-XHeader"
                :left-options="{showBack: true,backText:''}"
                :right-options="{showMore: false}"
      >{{title}}
        <div slot="right" v-if="showSearch">
          <x-icon type="ios-search-strong" size="24" @click="handleClickSearch"></x-icon>
        </div>
      </x-header>
      <div>
        <Group class="needsclick" :title="groupTitle||title">
          <CellBox
            is-link
            :arrow=false
            v-for="(user,index) of starList"
            :key="user.id"
            @click.native="handleClickCellBox(user)"
          >
            <postcard :avatar="user.avatar"
                      :uname="user.name"
                      :desc="user.about"
                      :value="!user.stared"
                      @on-click-button="handleClickNotStar(user,index)"
            ></postcard>
          </CellBox>
          <LoadMore :show-loading=false :tip="emptyTip" style="padding-top:10px;"
                    v-if="starList.length===0"></LoadMore>
        </Group>
      </div>
    </ViewBox>
  </div>
</template>

<script>
  import {ViewBox, XHeader, Group, Search, LoadMore} from 'vux'
  import postcard from 'components/postcard/postcard'
  import CellBox from 'components/cell-box'
  import stickybits from 'stickybits'

  export default {
    name: "cardListPage",
    components: {...{ViewBox, XHeader, Group, Search, LoadMore}, CellBox, postcard},
    props: {
      searchPlaceholder: String,
      title: String,
      groupTitle: String,
      emptyTip: String,
      searchResult: Array,
      starList: Array,
      showSearch: Boolean
    },
    data: () => ({
      timerDelaySearch: null,
      searchShow: false,
      searchValue: '',
    }),
    mounted() {
      stickybits('.vux-header')
    },
    methods: {
      handleClickCellBox(user) {
        this.$router.push({path: '/profile', query: {uid: user.id}})
      },
      handleClickNotStar(user, index) {
        const that = this;
        this.$vux.confirm.show({
          title: "取消关注",
          dialogTransition: "",
          content: `确定要取消对<strong>${user.name}</strong>的关注吗?`,
          onConfirm() {
            that.starList.splice(index, 1);
          }
        });
        event.stopPropagation()
      },
      handleClickSearch() {
        const that = this;
        this.searchShow = true;
        this.$nextTick(() => {
          that.$refs.search.setFocus();
        })
      },
      handleSearch(val) {
        const that = this;
        clearTimeout(this.timerDelaySearch);
        this.timerDelaySearch = setTimeout(() => {
          console.log(val)
          that.$emit('search', val)
        }, 500)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./cardListPage";
</style>
