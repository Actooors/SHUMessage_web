<template>
  <CardListPage
    :title="`关注${isUser?'我':'TA'}的人`"
    :emptyTip="`还没有人关注${isUser?'我':'TA'}诶...`"
    :searchResult="searchResult"
    :starList="starList"
    :showSearch="false"
  ></CardListPage>
</template>

<script>

  export default {
    name: "follower",
    components: {
      CardListPage: () => import('components/cardListPage/cardListPage')
    },
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
    })
  }
</script>
