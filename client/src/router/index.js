import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home')
  },
  {
    path: '/places',
    name: 'Places',
    component: () => import('../views/Places')
  },
  {
    path: '/routes',
    name: 'Routes',
    component: () => import('../views/Routes')
  },
  {
    path: '/routes/:id',
    name: 'RouteDetails',
    props: true,
    component: () => import('../views/RouteDetails')
  },
  {
    path: '/places/:id',
    name: 'PlaceDetails',
    props: true,
    component: () => import('../views/PlaceDetails')
  },
  {
    path: '/weather',
    name: 'Weather',
    component: () => import('../views/Weather')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../views/SignUp')
  },
  {
    path: '/map',
    name: 'MapView',
    component: () => import('../views/Map')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
