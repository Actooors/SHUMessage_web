<template>
  <div>
    <ViewBox
      class="momentPublish-wrapper"
      body-padding-bottom="46px"
    >
      <x-header slot="header" class="theme-XHeader"
                :left-options="{showBack: true,backText:''}"
                :right-options="{showMore: false}"
      >关注{{isUser?"我":"TA"}}的
      </x-header>
      <div>
        <Group class="needsclick" :title="`关注${isUser?'我':'TA'}的人`">
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
          <LoadMore :show-loading=false tip="你还没有关注的人哦！" style="padding-top:10px;"
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
    name: "follower",
    components: {...{ViewBox, XHeader, Group, Search, LoadMore}, CellBox, postcard},
    data: () => ({
      isUser: true,
      timerDelaySearch: null,
      searchShow: false,
      searchValue: '',
      searchResult: [{
        avatar: 'https://avatars3.githubusercontent.com/u/559179?s=460&v=4',
        name: '谷歌',
        about: '这是一个人',
        id: '1'
      }, {
        avatar: 'https://avatars3.githubusercontent.com/u/559180?s=460&v=4',
        name: '百度',
        about: '这是另一个人',
        id: '2'
      }, {
        avatar: 'https://avatars3.githubusercontent.com/u/559181?s=460&v=4',
        name: '搜狗',
        about: '这是另另一个人',
        id: '3'
      }, {
        avatar: 'https://avatars3.githubusercontent.com/u/559182?s=460&v=4',
        name: '有道',
        about: '这是另另另一个人',
        id: '4'
      }, {
        avatar: 'https://avatars3.githubusercontent.com/u/559183?s=460&v=4',
        name: '携程',
        about: '这是另另另另一个人',
        id: '5'
      }, {
        avatar: 'https://avatars3.githubusercontent.com/u/559184?s=460&v=4',
        name: '网易',
        about: '这是另另另另另一个人',
        id: '6'
      }, {
        avatar: 'https://avatars3.githubusercontent.com/u/559185?s=460&v=4',
        name: '阿里',
        about: '这是另另另另另另一个人',
        id: '7'
      }],
      starList: [{
        avatar: 'https://avatars3.githubusercontent.com/u/559179?s=460&v=4',
        name: '谷歌',
        about: '这是一个人',
        id: '1',
        stared: true
      }, {
        avatar: 'https://avatars3.githubusercontent.com/u/559180?s=460&v=4',
        name: '百度',
        about: '这是另一个人',
        id: '2',
        stared: true
      }, {
        avatar: 'https://avatars3.githubusercontent.com/u/559181?s=460&v=4',
        name: '搜狗',
        about: '这是另另一个人',
        id: '3',
        stared: true
      }, {
        avatar: 'https://avatars3.githubusercontent.com/u/559182?s=460&v=4',
        name: '有道',
        about: '这是另另另一个人',
        id: '4',
        stared: true
      }, {
        avatar: 'https://avatars3.githubusercontent.com/u/559183?s=460&v=4',
        name: '携程',
        about: '这是另另另另一个人',
        id: '5',
        stared: true
      }, {
        avatar: 'https://avatars3.githubusercontent.com/u/559184?s=460&v=4',
        name: '网易',
        about: '这是另另另另另一个人',
        id: '6',
        stared: true
      }, {
        avatar: 'https://avatars3.githubusercontent.com/u/559185?s=460&v=4',
        name: '阿里',
        about: '这是另另另另另另一个人',
        id: '7',
        stared: true
      }]
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
        clearTimeout(this.timerDelaySearch);
        this.timerDelaySearch = setTimeout(() => {
          console.log(val)
        }, 500)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./follower";
</style>
