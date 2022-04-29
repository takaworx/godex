const state = {
  query: null
}

const getters = {
  getQuery (state) {
    return state.query
  }
}

const mutations = {
  setQuery (state, value) {
    state.query = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
