export default {
  data: () => ({
    raw: [{
      blockName: "校友都在看",
      blockAppend: {
        type: "buttonLink",
        title: "查看更多热门",
        link: "/moments/pop"
      },
      cards: [{
        info: {
          type: 1,
          id: 1
        },
        topic: {
          id: 21,
          name: "今天不开心"
        },
        content: "你真的确定知道你在说什么吗？",//文本消息
        photos: ["", "", ""],//相关图片，前端需要按照QQ空间进行优化
        author: {
          id: 10001,
          avatar: "https://avatars2.githubusercontent.com/u/30586220?s=460&v=4",
          name: "名字刚刚七个字"
        },
        publishTime: "2018-08-26T02:15:04",
        shareInfo: {
          like: 64,
          comment: 73,
          share: 2
        },
        showStar: true
        // position: {//后端记录每条信息的position经纬度，计算后返回
        //   name: "栋霖科技园",
        //   distance: "5km"
        // },
      }, {
        info: {
          type: 1,
          id: 1
        },
        topic: {
          id: 21,
          name: "今天不开心"
        },
        content: "你真的确定知道你在说什么吗？",//文本消息
        photos: ["", "", ""],//相关图片，前端需要按照QQ空间进行优化
        author: {
          id: 10001,
          avatar: "https://avatars2.githubusercontent.com/u/30586220?s=460&v=4",
          name: "名字刚刚七个字"
        },
        publishTime: "2018-08-26T02:15:04",
        shareInfo: {
          like: 64,
          comment: 73,
          share: 2
        },
        showStar: true
        // position: {//后端记录每条信息的position经纬度，计算后返回
        //   name: "栋霖科技园",
        //   distance: "5km"
        // },
      }, {
        info: {
          type: 1,
          id: 1
        },
        topic: {
          id: 21,
          name: "今天不开心"
        },
        content: "你真的确定知道你在说什么吗？",//文本消息
        photos: ["", "", ""],//相关图片，前端需要按照QQ空间进行优化
        author: {
          id: 10001,
          avatar: "https://avatars2.githubusercontent.com/u/30586220?s=460&v=4",
          name: "名字刚刚七个字"
        },
        publishTime: "2018-08-26T02:15:04",
        shareInfo: {
          like: 64,
          comment: 73,
          share: 2
        },
        showStar: true
        // position: {//后端记录每条信息的position经纬度，计算后返回
        //   name: "栋霖科技园",
        //   distance: "5km"
        // },
      }]
    }, {
      blockName: "我的关注",
      cards: [{
        info: {
          type: 1,
          id: 1
        },
        topic: {
          id: 21,
          name: "今天不开心"
        },
        content: "你真的确定知道你在说什么吗？",//文本消息
        photos: ["", "", ""],//相关图片，前端需要按照QQ空间进行优化
        author: {
          id: 10001,
          avatar: "https://avatars2.githubusercontent.com/u/30586220?s=460&v=4",
          name: "名字刚刚七个字"
        },
        publishTime: "2018-08-26T02:15:04",
        shareInfo: {
          like: 64,
          comment: 73,
          share: 2
        },
        showStar: false
        // position: {//后端记录每条信息的position经纬度，计算后返回
        //   name: "栋霖科技园",
        //   distance: "5km"
        // },
      }, {
        info: {
          type: 1,
          id: 1
        },
        content: "",//文本消息
        photos: [],//相关图片，前端需要按照QQ空间进行优化
        author: {
          id: 10001,
          avatar: "https://avatars2.githubusercontent.com/u/30586220?s=460&v=4",
          name: "名字刚刚七个字"
        },
        publishTime: "2018-08-26T00:15:04",
        hideExtra: true,
        band: "关注了",
        extraUser: {
          id: 10002,
          name: "莫之章"
        },
      }]
    }]
  })
}
