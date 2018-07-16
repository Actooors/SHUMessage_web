import Vue from 'vue'
import Router from 'vue-router'
import Mainpage from 'pages/mainpage/mainpage'
import Self from 'pages/self/self'
import More from 'pages/self/more/more'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      component: Mainpage,
      children: [
        // {
        //   path: '',
        //   name: 'mainpage',
        // },
        {
          path: 'self',
          name: 'self',
          component: Self
        }
      ]
    },
    {
      path: 'self/more',
      name: 'more',
      component: More
    }
  ]
})
