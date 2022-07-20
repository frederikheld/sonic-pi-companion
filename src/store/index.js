import Vue from 'vue'
import Vuex from 'vuex'

import resourcesIndex from './build-time-data/resources-index.json'
import releaseInfo from './build-time-data/release-info.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    resourcesIndex: resourcesIndex[0],
    releaseInfo: releaseInfo
  },
  getters: {
    resourcesIndex (state) {
      return state.resourcesIndex
    },
    releaseInfo (state) {
      return state.releaseInfo
    },
    currentAppVersion (state) {
      return state.releaseInfo.version
    },
    samplesByType (state) {
      const result = {}
      state.resourcesIndex.samples.forEach(path => {
        const type = path.split('/').at(-1).split('_')[0]
        const name = path.split('/').at(-1).split('.')[0]
        const shortName = name.split('_').slice(1).join('_')
        const shortNameForHumans = shortName.split('_').join(' ')

        if (!result[type]) {
          result[type] = []
        }

        result[type].push({
          type: type,
          name: name,
          shortName: shortName,
          shortNameForHumans: shortNameForHumans,
          path: path
        })
      })
      return result
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
