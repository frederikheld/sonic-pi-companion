import Vue from 'vue'
import Vuex from 'vuex'

import resourcesIndex from './resources_index.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    resourcesIndex: resourcesIndex[0]
  },
  getters: {
    resourcesIndex (state) {
      return state.resourcesIndex
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
