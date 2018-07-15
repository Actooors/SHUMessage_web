import Vue from 'vue'
import Router from 'vue-router'
import Mainpage from 'pages/mainpage/mainpage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainpage',
      component: Mainpage
    }
  ]
})
