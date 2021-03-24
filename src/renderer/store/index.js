import Vue from 'vue'
import Vuex from 'vuex'
import amap from './modules/amap'
import getters from './getters'
import { createPersistedState, createSharedMutations } from 'vuex-electron'

// import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    amap
  },
  // plugins: [
  //   createPersistedState(),
  //   createSharedMutations()
  // ],
  getters,
  strict: process.env.NODE_ENV !== 'production'
})
