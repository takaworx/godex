import PokemonApi from '@/services/pokemon-api'

const state = {
  colors: []
}

const getters = {
  getColors: (state) => {
    return state.colors
  }
}

const mutations = {
  pushColor (state, value) {
    state.colors.push(value)
  }
}

const actions = {
  async fetchPokemonColors ({ commit }) {
    const colorList = await PokemonApi.getPokemonColorsList()

    colorList.results.forEach(async (color) => {
      const pokemonsByColor = await PokemonApi.getPokemonColorByName(color.name)
      commit('pushColor', {
        name: color.name,
        pokemons: pokemonsByColor.pokemon_species
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
