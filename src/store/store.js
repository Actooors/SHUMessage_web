import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const top = {
  namespaced: true,
  state: {
    header_title: "SHU_Message",
    optionMethod: function () {
    }
  },
  mutations: {
    CHANGE_HEADER_TITLE(state, title) {
      state.header_title = title
    },
    CHANGE_HEADER_OPTION(state, option) {
      state.header_option = option
    },
    CHANGE_HEADER_OPTION_METHOD(state, m) {
      state.optionMethod = m
    }
  }
};

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
};

const pushRouter = {
  namespaced: true,
  state: {
    cardItem: null,
    routeChanged: false,
    defaultHistoryLength: 0,
    scrollTop: {},
    topBarOffset: {}
  },
  mutations: {
    SET_CARD_ITEM(state, item) {
      state.cardItem = item
    },
    SET_ROUTE_CHANGED(state, val) {
      state.routeChanged = val
    },
    SET_DEFAULT_HISTORY_LENGTH(state, val) {
      state.defaultHistoryLength = val
    },
    SET_SCROLL_TOP(state, {index, val}) {
      state.scrollTop[index] = val
    },
    SET_TOP_BAR_OFFSET(state, {index, val}) {
      state.topBarOffset[index] = val
    }
  },
  actions: {
    SET_SCROLL_TOP({commit}, option) {
      commit('SET_SCROLL_TOP', option)
    },
    SET_TOP_BAR_OFFSET({commit}, option) {
      commit('SET_TOP_BAR_OFFSET', option)
    }
  }
};


export default new Vuex.Store({
  modules: {
    top,
    playground,
    pushRouter
  },
})


