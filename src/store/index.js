import Vue from 'vue'
import Vuex from 'vuex'

import PokemonModule from './pokemon'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    getUser (state) {
      return state.user
    }
  },
  mutations: {
    setUser (state, value) {
      state.user = value
    }
  },
  actions: {
    fetchUser ({ commit }) {
      //
    }
  },
  modules: {
    pokemon: PokemonModule
  }
})
