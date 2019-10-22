import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/pay',
      name: 'pay',
      component: () => import('./views/Pay.vue')
    },
    {
      path: '/payments',
      name: 'payments',
      component: () => import('./views/Payments.vue')
    }
  ]
})
