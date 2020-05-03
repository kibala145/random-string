import Vue from 'vue'
import Vuex from 'vuex'

const webworker = new Worker('./webworker.js', {type: 'module'})

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isGenerating: false,
    generatingCount: null,
    isSearching: false,
    searchCount: null,
    searchString: null,
    isDatabaseLoading: false,
    isDatabaseEmpty: false,
    isDatabaseClearing: false,
    lastSearchDuration: null,
    error: null
  },
  getters: {
    loading: state => state.isGenerating || state.isSearching || state.isDatabaseLoading
  },
  mutations: {
    SET_IS_GENERATING(state, value = true) {
      state.isGenerating = value
    },
    SET_GENERATING_COUNT(state, value) {
      state.generatingCount = value
    },
    SET_IS_SEARCHING(state, value = true) {
      state.isSearching = value
    },
    SET_SEARCH_COUNT(state, value) {
      state.searchCount = value
    },
    SET_SEARCH_STRING(state, value) {
      state.searchString = value
    },
    SET_IS_DATABASE_LOADING(state, value = true) {
      state.isDatabaseLoading = value
    },
    SET_IS_DATABASE_EMPTY(state, value) {
      state.isDatabaseEmpty = value
    },
    SET_IS_DATABASE_CLEARING(state, value = true) {
      state.isDatabaseClearing = value
    },
    SET_LAST_SEARCH_DURATION(state, value) {
      state.lastSearchDuration = value
    },
    SET_ERROR(state, value = true)  {
      state.error = value
    }
  },
  actions: {
    initApp() {
      webworker.postMessage({type: 'getObjectStore'})
    },
    generateStrings() {
      webworker.postMessage({type: 'makeRandomStrings'})
    },
    getStringsCount({commit}, {value = null, searchByValue = true}) {
      commit('SET_SEARCH_STRING', value)
      webworker.postMessage({type: 'getRandomStringsCount', payload: {value, searchByValue}})
    },
    clearStorage() {
      webworker.postMessage({type: 'clearStorage'})
    }
  },
  modules: {
  }
})

// Handle incoming messages as commits and actions
webworker.onmessage = e => {
  store.commit(e.data.type, e.data.payload)
}

export default store