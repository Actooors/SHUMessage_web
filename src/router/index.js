import Vue from 'vue'
import store from 'store/store'
import Router from 'vue-router'
import Tabbar from 'pages/tabbar/tabbar'
import Self from 'pages/self/self'
import MoreIndex from 'pages/self/more'
import More from 'pages/self/more/more'
import Myinfo from 'pages/self/more/myinfo'
import Playground from 'pages/playground'
import Attention from 'pages/playground/attention'
import Recommend from 'pages/playground/recommend'
import Neighborhood from 'pages/playground/neighborhood'
import Moments from 'pages/moments/moments'
import Find from 'pages/find/find'
import MsgDetail from 'pages/msgDetails/msgDetail'
import CommentDetail from 'pages/msgDetails/commentDetail'
import Seo from 'pages/seo/seo'

Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      component: Tabbar,
      children: [
        {
          path: '',
          redirect: '/playground'
        },
        {
          path: 'playground',
          meta: {
            tabbarIndex: 0
          },
          component: Playground,
          children: [{
            path: '',
            redirect: 'recommend'
          }, {
            path: 'attention',
            component: Attention,
            meta: {
              tabIndex: 0
            }
          }, {
            path: 'recommend',
            component: Recommend,
            meta: {
              tabIndex: 1
            }
          }, {
            path: 'neighborhood',
            component: Neighborhood,
            meta: {
              tabIndex: 2
            }
          }]
        },
        {
          path: 'moments',
          meta: {
            tabbarIndex: 1
          },
          component: Moments,
        },
        {
          path: 'find',
          meta: {
            tabbarIndex: 2
          },
          component: Find,
        },
        {
          path: 'self',
          component: Self,
          meta: {
            tabbarIndex: 3
          }
        },
      ]
    },
    {
      path: '/self/more',
      component: MoreIndex,
      children: [
        {
          path: "",
          component: More
        },
        {
          path: "myinfo",
          component: Myinfo
        }
      ]
    },
    {
      path: "/msgDetail",
      name: "msgDetail",
      component: MsgDetail
    },
    {
      path: "/commentDetail",
      name: "commentDetail",
      component: CommentDetail
    },
    {
      path: "/seo",
      component: Seo
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to, from)
  // 简单判断并写入能否通过this.$router.go(-1)回退
  if (from.matched.length) {
    store.commit("pushRouter/SET_ROUTE_CHANGED", true)
    store.commit("pushRouter/SET_DEFAULT_HISTORY_LENGTH", history.length)
  }
  next()
})

export default router
