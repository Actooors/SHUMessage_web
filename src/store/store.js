import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    header_title: "SHU_Message"
  },
  mutations: {
    CHANGE_HEADER_TITLE(state, title) {
      state.header_title = title
    }
  }
})
