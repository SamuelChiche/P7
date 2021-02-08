import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/store'
import Home from "../views/Home.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component:() => import('../views/Login.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue'),
  },
  {
    path: '/userboard',
    name: 'userboard',
    meta : {
      requiresAuth: true
    },
    component: () => import('../views/UserBoard.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(store.getters.isLoggedIn == true){
      next()
      return
    } 
      next({path: '/login'})
    
  } else {
    next()
  } 
})

export default router
