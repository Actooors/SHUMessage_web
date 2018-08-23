import Vue from 'vue'
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

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      component: Tabbar,
      children: [
        {
          path: '',
          name: 'tabbar',
          redirect: '/playground'
        },
        {
          path: 'playground',
          // name: 'playground',
          component: Playground,
          children: [{
            path: '',
            redirect: 'recommend'
          }, {
            path: 'attention',
            component: Attention
          }, {
            path: 'recommend',
            component: Recommend
          }, {
            path: 'neighborhood',
            component: Neighborhood
          }],
          meta: {
            tabbarIndex: 0
          }
        },
        {
          path: 'self',
          name: 'self',
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
          name: "more",
          component: More
        },
        {
          path: "myinfo",
          name: "myinfo",
          component: Myinfo
        }
      ]
    }
  ]
})
