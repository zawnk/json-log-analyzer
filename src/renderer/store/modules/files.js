const state = {
  fileList: []
}

const mutations = {
  SET_FILE_LIST (state, val) {
    state.fileList = val
  },
  REMOVE_FILE_WITH_INDEX (state, index) {
    state.fileList.splice(index, 1)
  },
  ADD_TO_FILE_LIST (state, entry) {
    state.fileList.push(entry)
  },
  CLEAR_FILES (state) {
    state.fileList = []
  }
}

const actions = {
  setFileList ({ commit }, val) {
    commit('SET_FILE_LIST', val)
  },
  removeFileWithIndex ({ commit }, index) {
    commit('REMOVE_FILE_WITH_INDEX', index)
  },
  addNewPathsToFileList ({ commit, state }, list) {
    for (let entry of list) {
      if (state.fileList.indexOf(entry) < 0) {
        commit('ADD_TO_FILE_LIST', entry)
      }
    }
  },
  clearFiles ({ commit }) {
    commit('CLEAR_FILES')
  }
}

export default {
  state,
  mutations,
  actions
}
