<template>
  <CardListPage
    :title="`${isUser?'我':'TA'}创建的圈子`"
    :emptyTip="`${isUser?'你':'TA'}还没有创建任何圈子哦`"
    :searchResult="searchResult"
    :starList="starList"
    :showSearch="isUser"
    :showButton="false"
    linkURI="/group"
  ></CardListPage>
</template>

<script>

  export default {
    name: "myGroup",
    components: {
      CardListPage: () => import('components/cardListPage/cardListPage')
    },
    data: () => ({
      isUser: true,
      searchResult: [{
        avatar: 'https://avatars2.githubusercontent.com/u/47444380?s=70&v=4',
        name: '谷歌',
        about: '这是一个圈子',
        id: '1'
      }, {
        avatar: 'https://avatars2.githubusercontent.com/u/47444381?s=70&v=4',
        name: '百度',
        about: '这是另一个圈子',
        id: '2'
      }, {
        avatar: 'https://avatars2.githubusercontent.com/u/47444382?s=70&v=4',
        name: '搜狗',
        about: '这是另另一个圈子',
        id: '3'
      }, {
        avatar: 'https://avatars2.githubusercontent.com/u/47444383?s=70&v=4',
        name: '有道',
        about: '这是另另另一个圈子',
        id: '4'
      }, {
        avatar: 'https://avatars2.githubusercontent.com/u/47444384?s=70&v=4',
        name: '携程',
        about: '这是另另另另一个圈子',
        id: '5'
      }, {
        avatar: 'https://avatars2.githubusercontent.com/u/47444385?s=70&v=4',
        name: '网易',
        about: '这是另另另另另一个圈子',
        id: '6'
      }, {
        avatar: 'https://avatars2.githubusercontent.com/u/47444386?s=70&v=4',
        name: '阿里',
        about: '这是另另另另另另一个圈子',
        id: '7'
      }],
      starList: []
    })
  }
</script>
