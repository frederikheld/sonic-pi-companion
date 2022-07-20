import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about-app',
    name: 'about-app',
    component: () => import(/* webpackChunkName: "about-app" */ '../views/AboutAppView.vue')
  },
  {
    path: '/about-sonic-pi',
    name: 'about-sonic-pi',
    component: () => import(/* webpackChunkName: "about-sonic-pi" */ '../views/AboutSonicPiView.vue')
  },
  {
    path: '/samples-preview',
    name: 'samples-preview',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "samples-preview" */ '../views/SamplesPreviewView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
