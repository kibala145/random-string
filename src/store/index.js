import Vue from 'vue'
import Vuex from 'vuex'

const webworker = new Worker('./webworker.js', {type: 'module'})

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    strings: [],
    loading: false
  },
  mutations: {
    SET_APP_LOADING(state, value = true) {
      state.loading = value
    },
    SET_STRINGS(state, value) {
      localStorage.getItem('strings')
      state.strings = value
    }
  },
  actions: {
    initApp({dispatch}) {
      // todo check if strings array exist

      dispatch('generateStrings')
    },
    generateStrings() {
      webworker.postMessage('generate')
    }
  },
  modules: {
  }
})

// Handle incoming messages as commits
webworker.onmessage = e => {
  store.commit(e.data.type, e.data.payload);
}

export default store