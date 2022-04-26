const Pokedex = require('pokeapi-js-wrapper')

const P = new Pokedex.Pokedex()

const getPokemonList = async (offset, limit) => {
  return await P.getPokemonsList({
    offset,
    limit
  })
}

const getPokemonByName = async (name) => {
  return await P.getPokemonByName(name)
}

const getPokemonColorsList = async (name) => {
  return await P.getPokemonColorsList()
}

const getPokemonColorByName = async (name) => {
  return await P.getPokemonColorByName(name)
}

export default {
  getPokemonList,
  getPokemonByName,
  getPokemonColorsList,
  getPokemonColorByName
}
