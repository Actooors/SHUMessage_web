export default {
  data: () => ({
    raw: [{
      cards: [{
        info: {
          type: 1,
          id: 1
        },
        content: "赞了我",//文本消息
        isLike: true,
        photos: ["", "", ""],//相关图片，前端需要按照QQ空间进行优化
        author: {
          id: 10001,
          avatar: "/static/testAvatar.JPG",
          name: "--正--"
        },
        publishTime: "2018-08-26T02:15:04",
        media: {
          author: {
            id: 10001,
            avatar: "/static/img/avatar.png",
            name: "赤膊吃西瓜"
          },
          img: "http://mzzeast.shumsg.cn/18-9-8/83429141.jpg",
          title: "看看我家的狗，帅不帅？？？哈哈哈哈哈哈哈"
        }
      }, {
        info: {
          type: 1,
          id: 1
        },
        content: "",//文本消息
        photos: [],//相关图片，前端需要按照QQ空间进行优化
        author: {
          id: 10001,
          avatar: "/static/testAvatar.JPG",
          name: "--正--"
        },
        publishTime: "2018-08-26T00:15:04",
        hideExtra: true,
        showStar: true,
        band: "关注了",
        extraUser: {
          id: 10002,
          name: "莫之章"
        },
        // media: {
        //   value: "https://www.baidu.com/",
        //   title: "这是一条通向百度的URL"
        // }
      }]
    }],
    userInfo: {
      username: '--正--',
      sex: '女',
      starNum: 352,
      createThemeNum: 0,
      starThemeNum: 447,
      starOthersNum: 97,
      likeSum: "3.5k",
      signature: 'Nice to meet you :) 多一点字啊看一看啊快过来看看',
      basic: [
        {
          label: "性别",
          value: "女"
        },
        {
          label: "星座",
          value: "巨蟹座"
        },
        {
          label: "所在地",
          value: "山西 - 太原"
        },
      ],
      tags: [{
        name: "Message合伙人"
      }, {
        name: "♀"
      }, {
        name: "太原"
      }, {
        name: "天秤座"
      },],
      tipToYou: "她也关注了主题“校园新动向”",
    }
  })
}
