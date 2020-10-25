import Vue from 'vue'
import Vuex from 'vuex'
import RouteModule from './route'
import PlacesCategory from './placesCategory'
import Places from './places'
import Province from './province'
import AuthModule from './auth'
import GeneralModule from './general'
import UserModule from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    RouteModule,
    PlacesCategory,
    Places,
    Province,
    GeneralModule,
    AuthModule,
    UserModule
  }
})
