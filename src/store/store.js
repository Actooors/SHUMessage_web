import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    header_title: "SHU_Message",
  },
  mutations: {
    CHANGE_HEADER_TITLE(state, title) {
      state.header_title = title
    }
  }
})

export const playground = new Vuex.Store({
  state: {
    nodeTab: null,
    nodeTopBar: null,
    nodeTabbar: null,
    searchHeight: null
  },
  mutations: {
    SET_NODE_TAB(state, node) {
      state.nodeTab = node
    },
    SET_NODE_TOPBAR(state, node) {
      state.nodeTopBar = node
    },
    SET_NODE_TABBAR(state, node) {
      state.nodeTabbar = node
    },
    SET_SEARCH_HEIGHT(state, height) {
      state.searchHeight = height
    }
  }
})
