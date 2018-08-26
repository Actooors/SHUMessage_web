import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const top = {
  namespaced: true,
  state: {
    header_title: "SHU_Message",
  },
  mutations: {
    CHANGE_HEADER_TITLE(state, title) {
      state.header_title = title
    }
  }
}

const playground = {
  namespaced: true,
  state: {
    nodeTab: null,
    nodeTopBar: null,
    nodeTabbar: null,
    searchHeight: null,
    playgroundNow: ''
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
    },
    SET_PLAYGROUND_NOW(state, NOW) {
      state.playgroundNow = NOW
    }
  }
}

const pushRouter = {
  namespaced: true,
  state: {
    cardItem: null
  },
  mutations: {
    SET_CARD_ITEM(state, item) {
      state.cardItem = item
    }
  }
}


export default new Vuex.Store({
  modules: {
    top,
    playground,
    pushRouter
  },
})


