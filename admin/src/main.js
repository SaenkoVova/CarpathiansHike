import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import NProgres from 'nprogress';
import { sync } from 'vuex-router-sync';
import './plugins/axios';
import './plugins/chartist';
import JsonCSV from 'vue-json-csv'

Vue.component('downloadCsv', JsonCSV)

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

axios.interceptors.request.use(
  function(request) {
    NProgres.start();
    return request;
  },
  function(error) {
    NProgres.done();
    return Promise.reject(error)
  }
);

axios.interceptors.response.use(
  function(response) {
    NProgres.done();
    return response;
  },
  function(error) {
    NProgres.done();
    return Promise.reject(error);
  }
);

sync(store, router);

new Vue({
  router,
  store,
  vuetify,
  axios,
  render: h => h(App)
}).$mount('#app')
