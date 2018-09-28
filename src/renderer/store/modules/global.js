const state = {
  loading: false
}

const mutations = {
  SET_LOADING (state, val) {
    state.loading = val
  },
  CLEAR_GLOBALS (state) {
    state.loading = false
  }
}

const actions = {
  setLoading ({ commit }, val) {
    commit('SET_LOADING', !!val)
  },
  clearGlobals ({commit}) {
    commit('CLEAR_GLOBALS')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
