<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" v-for="(pokemon, key) in pokemons" :key="key">
        <pokemon-thumbnail :name="pokemon.name" />
      </v-col>
    </v-row>
    <div class="text-center">
      <v-progress-circular indeterminate v-intersect="paginate"></v-progress-circular>
    </div>
  </v-container>
</template>

<script>
import PokemonThumbnail from '@/components/PokemonThumbnail.vue'

export default {
  components: {
    PokemonThumbnail
  },
  data: () => ({
    currentPage: 0,
    resultPerPage: 8
  }),
  computed: {
    pokemons () {
      return this.$store.getters['pokemon/getPokemons'].slice(0, this.currentPage * this.resultPerPage)
    }
  },
  methods: {
    paginate () {
      this.currentPage++
    }
  }
}
</script>
