<template>
  <v-container fluid class="pa-1">
    <v-row no-gutters justify="center">
      <v-col class="pa-1" cols="6" xl="4" v-for="(pokemon, key) in pokemons" :key="key">
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
    device () {
      return this.$store.getters['window/getDevice']
    },
    resultPerPage () {
      switch (this.device) {
        case 'large-desktop':
        case 'desktop':
        case 'tablet':
          return 16
        case 'mobile':
        default:
          return 12
      }
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
