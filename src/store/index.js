import { createStore } from 'vuex'

export default createStore({
  state: {
    email: null
  },
  getters: {
    email(state) {
      return state.email
  }
  },
  mutations: {
    ADD_EMAIL(state, email) {
      state.email = email
    }
  },
  actions: {
    userEmail({commit}, email) {
      commit('ADD_EMAIL', email)
    }
  },
  modules: {
  }
})
