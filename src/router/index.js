import Vue from 'vue'
import Router from 'vue-router'
import Mainpage from 'pages/mainpage/mainpage'
import Self from 'pages/self/self'
import MoreIndex from 'pages/self/more'
import More from 'pages/self/more/more'
import Myinfo from 'pages/self/more/myinfo'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      component: Mainpage,
      children: [
        {
          path: '',
          name: 'mainpage',
        },
        {
          path: 'self',
          name: 'self',
          component: Self
        }
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
          path:"myinfo",
          name:"myinfo",
          component:Myinfo
        }
      ]
    }
  ]
})
