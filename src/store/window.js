const state = {
  device: 'mobile'
}

const getters = {
  getDevice (state) {
    return state.device
  }
}

const mutations = {
  setDevice (state, value) {
    state.device = value
  }
}

const actions = {
  calculate ({ commit }) {
    if (window.innerWidth > 1904) {
      return commit('setDevice', 'large-desktop')
    }

    if (window.innerWidth >= 1264) {
      return commit('setDevice', 'desktop')
    }

    if (window.innerWidth >= 600) {
      return commit('setDevice', 'tablet')
    }

    commit('setDevice', 'mobile')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
