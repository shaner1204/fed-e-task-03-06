import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('user') || 'null'),
    breadCrumbs: []
  },
  mutations: {
    setUser (state, payload) {
      state.user = JSON.parse(payload)
      // 为了防止页面刷新数据丢失，需要把 user 数据持久化
      // 注意：本地存储只能存储字符串
      window.localStorage.setItem('user', payload)
    },
    // 面包屑数据
    setBreadCrumbs (state, payload) {
      state.breadCrumbs = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
