<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" v-for="(pokemon, key) in pokemons" :key="key">
        <pokemon-thumbnail :name="pokemon.name" />
      </v-col>
    </v-row>
    <infinite-loading />
  </v-container>
</template>

<script>
import PokemonApi from '@/services/pokemon-api'
import PokemonThumbnail from '@/components/PokemonThumbnail.vue'

export default {
  components: {
    PokemonThumbnail
  },
  data: () => ({
    currentPage: 1,
    resultPerPage: 8,
    pokemons: []
  }),
  mounted () {
    this.getPokemons()
  },
  methods: {
    async getPokemons () {
      try {
        const offset = this.resultPerPage * (this.currentPage - 1)
        const response = await PokemonApi.getPokemonList(offset, this.resultPerPage)
        this.pokemons = response.results
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
