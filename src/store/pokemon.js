import PokemonApi from '@/services/pokemon-api'

const state = {
  pokemons: [],
  colors: [],
  activeCard: null
}

const getters = {
  getPokemons: (state) => {
    return state.pokemons
  },
  getColors: (state) => {
    return state.colors
  },
  getActiveCard: (state) => {
    return state.activeCard
  }
}

const mutations = {
  setPokemons (state, value) {
    state.pokemons = value
  },
  pushColor (state, value) {
    state.colors.push(value)
  },
  setActiveCard (state, value) {
    state.activeCard = value
  }
}

const actions = {
  async fetchPokemons ({ commit }) {
    const pokemons = await PokemonApi.getPokemonList(0, 10000)

    commit('setPokemons', pokemons.results)
  },
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
