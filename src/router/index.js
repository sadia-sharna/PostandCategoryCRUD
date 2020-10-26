import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Posts',
    component: () => import('../views/Posts.vue')
  },
  {
    path: '/category',
    name: 'Categories',
    component: () => import('../views/Categories.vue')
 }
]

const router = new VueRouter({
  routes
})

export default router
