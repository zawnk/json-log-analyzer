const state = {
  loading: false
}

const mutations = {
  SET_LOADING (state, val) {
    state.loading = val
  }
}

const actions = {
  setLoading ({ commit }, val) {
    commit('SET_LOADING', !!val)
  }
}

export default {
  state,
  mutations,
  actions
}
