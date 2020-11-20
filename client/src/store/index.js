import Vue from 'vue'
import Vuex from 'vuex'
import Province from './province'
import AuthModule from './auth'
import GeneralModule from './general'
import UserModule from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Province,
    GeneralModule,
    AuthModule,
    UserModule
  }
})
