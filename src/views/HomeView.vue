<template>
  <v-container fluid class="pa-1">
    <v-row no-gutters>
      <v-col class="pa-1" cols="6" md="4" xl="3" v-for="(pokemon, key) in pokemons" :key="key">
        <pokemon-thumbnail :name="pokemon.name" />
      </v-col>
    </v-row>
    <div class="mt-8 text-center">
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
    currentPage: 0
  }),
  computed: {
    resultPerPage () {
      if (window.innerWidth >= 1904) {
        return 32
      }

      if (window.innerWidth >= 1264) {
        return 24
      }

      if (window.innerWidth >= 960) {
        return 32
      }

      if (window.innerWidth >= 600) {
        return 24
      }

      return 8
    },
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
