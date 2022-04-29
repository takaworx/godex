import Vue from 'vue'
import Vuex from 'vuex'

import WindowModule from './window'
import PokemonModule from './pokemon'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    navDrawerOpen: false
  },
  getters: {
    getUser (state) {
      return state.user
    },
    getNavDrawerOpen (state) {
      return state.navDrawerOpen
    }
  },
  mutations: {
    setUser (state, value) {
      state.user = value
    },
    setNavDrawer (state, value) {
      state.navDrawerOpen = value
    }
  },
  actions: {
    openNavDrawer ({ commit }) {
      commit('setNavDrawer', true)
    },
    closeNavDrawer ({ commit }) {
      commit('setNavDrawer', false)
    }
  },
  modules: {
    window: WindowModule,
    pokemon: PokemonModule
  }
})
