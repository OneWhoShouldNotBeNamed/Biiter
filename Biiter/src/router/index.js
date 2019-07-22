import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import ViewBeats from '@/components/ViewBeats'
import AddBeats from '@/components/AddBeats'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/',
      name: 'ViewBeats',
      component: ViewBeats
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/addbeats',
      name: 'AddBeats',
      component: AddBeats
    }
  ]
})
