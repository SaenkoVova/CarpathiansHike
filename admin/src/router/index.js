import Vue from 'vue'
import VueRouter from 'vue-router'
import paths from './paths'
import store from '@/store'
import NProgress from 'nprogress'
import Meta from 'vue-meta'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: paths,
  base: '/admin',
  mode: 'history',
});


router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(store.getters.authorized) {
      next();
      return;
    }
    next('/');
  } else {
    next();
  }
})

router.beforeResolve((to, from, next) => {
  if(to.path) {
    NProgress.start();
  }
  next();
})

router.afterEach(() => {
  NProgress.done();
})

Vue.use(Meta)

export default router
