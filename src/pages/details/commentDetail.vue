<template>
  <MsgDetail
    headerTitle="评论详情"
    :show-comment=false
    :raw="raw"
    @onClickLike="handleClickLike"
  >
    <comment-card
      :content="item.content"
      :author="item.author"
      :publishTime="item.publishTime"
      :photos="item.photos"
      :like="item.like"
      :replies="item.replies"
      :info="item.info"
      :showComment=false
      @onClickLike="handleClickLike(item.info)"
    ></comment-card>
  </MsgDetail>
</template>

<script>
  import MsgDetail from 'components/msgDetail/msgDetail'
  import CommentCard from "components/commentCard/commentCard";
  import store from "store/store";
  import {commentDetail as mock} from "./mock";

  export default {
    name: "commentDetail",
    store,
    components: {MsgDetail, CommentCard},
    data: () => ({
      msg: {
        info: {
          type: 5,
          id: 1
        },
        content: "在公交车上站不动的老年人，免费发礼品时候都能冲刺",//文本消息
        photos: [""],//评论最多有一个图片
        author: {
          id: 10048,
          avatar: "https://avatars2.githubusercontent.com/u/30586220?s=460&v=4",
          name: "Sakura坠"
        },
        publishTime: "2018-08-26T15:15:04",
        like: 365,
        replies: {
          count: 15,
          representatives: [{//count大于等于2时最多两条
            author: {
              id: 10015,
              name: "怼图小姐姐扩列"
            },
            content: "中国大妈会让他们知道什么叫恐惧。。。真的。。。",
            photos: null
          }, {
            author: {
              id: 10016,
              name: "我来说句公道话"
            },
            content: "那些人还会觉得:既然免费送还花钱买，真傻。。这是一条超长评论这是一条超长评论这是一条超长评论这是一条超长评论",
            photos: [""]//评论最多有一个图片
          }]
        }
      }
    }),
    created() {
      this.loadData()
    },
    methods: {
      loadData() {
        if (!!store.state.pushRouter.cardItem) {
          //vuex里面存有状态，直接渲染
          this.item = store.state.pushRouter.cardItem
        } else {
          let {type, id} = this.$route.params
          //老老实实axios
          console.log("此处应该有ajax")
        }
      },
      handleClickLike(info) {
        console.log("commentDetail - handleClickLike", info)
      }
    },
    mixins: [mock]
  }
</script>

<style scoped>

</style>
