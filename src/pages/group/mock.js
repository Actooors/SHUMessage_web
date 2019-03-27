export default {
  data: () => ({
    raw: [{
      cards: [{
        info: {
          type: 1,
          id: 2
        },
        topic: {
          id: 2,
          name: "随手拍"
        },
        content: "看看我家的狗，帅不帅？？？哈哈哈哈哈哈哈",//文本消息
        author: {
          id: 10001,
          avatar: "https://avatars2.githubusercontent.com/u/30586220?s=460&v=4",
          name: "赤膊吃西瓜"
        },
        publishTime: "2018-08-25T13:15:04",
        shareInfo: {
          like: 5348,
          comment: 221,
          share: 149
        },
        footprint: {
          like: false,
          comment: false,
          share: false
        },
        position: {//后端记录每条信息的position经纬度，计算后返回
          name: "栋霖科技园",
          distance: "5km"
        },
        media: {
          type: "img",
          imgs: ["http://mzzeast.shumsg.cn/18-9-8/83429141.jpg", "http://mzzeast.shumsg.cn/18-9-8/25348271.jpg"]
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
          avatar: require('assets/images/avatar.png'),
          name: "赤膊吃西瓜"
        },
        publishTime: "2018-08-26T00:15:04",
        hideExtra: true,
        band: "关注了",
        extraUser: {
          id: 10002,
          name: "莫之章"
        },
      }]
    }],
    groupInfo: {
      username: '资源动态',
      avatar: 'https://avatars2.githubusercontent.com/u/47444380?s=70&v=4',
      sex: '男',
      starNum: 352,
      createGroupNum: 0,
      starGroupNum: 447,
      starOthersNum: 97,
      likeSum: "3.5k",
      signature: 'Nice to meet you :) 多一点字啊看一看啊快过来看看多一点字啊看一看啊快过来看看多一点字啊看一看啊快过来看看多一点字啊看一看啊快过来看看多一点字啊看一看啊快过来看看',
      basic: [
        {
          label: "性别",
          value: "男"
        },
        {
          label: "星座",
          value: "双鱼座"
        },
        {
          label: "所在地",
          value: "四川 - 成都"
        },
      ],
      tags: [{
        name: "Message合伙人"
      }, {
        name: "♀"
      }, {
        name: "成都"
      }, {
        name: "双鱼座"
      },],
      tipToYou: "他也关注了主题“校园新动向”",
    }
  })
}
