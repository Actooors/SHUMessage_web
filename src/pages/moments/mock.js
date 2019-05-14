export default {
  data: () => ({
    raw: [
      {
        blockName: "我的关注",
        cards: [{
          info: {
            type: 1,
            id: 1
          },
          topic: {
            id: 2,
            name: "随手拍"
          },
          content: "看看我家的狗狗，可爱吗？？？嘻嘻嘻",//文本消息
          author: {
            id: 10001,
            avatar: "https://ws1.sinaimg.cn/mw690/006P5HMAgy1g298s2a806j30jg0jg0tz.jpg",
            name: "︴猫猫怪￣ˇ￣"
          },
          publishTime: "2019-03-25T13:15:04",
          shareInfo: {
            like: 128,
            comment: 33,
            share: 1
          },
          footprint: {
            like: false,
            comment: false,
            share: false
          },
          position: {//后端记录每条信息的position经纬度，计算后返回
            name: "大场镇",
            distance: "1km"
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
          topic: {
            id: 21,
            name: "今天不开心"
          },
          content: "你真的确定知道你在说什么吗？",//文本消息
          photos: ["", "", ""],//相关图片，前端需要按照QQ空间进行优化
          author: {
            id: 10001,
            avatar: "https://ws1.sinaimg.cn/large/006P5HMAgy1g298wigpqcj3050050q2t.jpg",
            name: "名字刚刚七个字"
          },
          publishTime: "2018-08-26T02:15:04",
          shareInfo: {
            like: 64,
            comment: 73,
            share: 2
          },
          showStar: false
        }, {
          info: {
            type: 1,
            id: 1
          },
          content: "",//文本消息
          photos: [],//相关图片，前端需要按照QQ空间进行优化
          author: {
            id: 10001,
            avatar: "https://ws1.sinaimg.cn/large/006P5HMAgy1g298wigpqcj3050050q2t.jpg",
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
