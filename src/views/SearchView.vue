<template>
  <v-container fluid>
    <v-row v-if="query">
      <v-col>
        <p>Search result(s) for: <strong>{{ query }}</strong></p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" xl="4" v-for="(result, key) in results" :key="key">
        <pokemon-thumbnail :name="result.name" />
      </v-col>
    </v-row>
    <v-row v-if="query && !hasReachedEnd" justify="center">
      <v-col class="text-center">
        <v-progress-circular indeterminate v-intersect="paginate"></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PokemonThumbnail from '@/components/PokemonThumbnail.vue'

export default {
  data: () => ({
    page: 0,
    perPage: 18
  }),
  components: {
    PokemonThumbnail
  },
  computed: {
    query () {
      return this.$store.getters['search/getQuery']
    },
    match () {
      if (!this.query) {
        return []
      }

      return this.$store.getters['pokemon/getPokemons'].filter(pokemon => {
        const pattern = new RegExp(`(${this.query})`, 'i')
        return pattern.test(pokemon.name)
      })
    },
    results () {
      return this.match.slice(0, this.page * this.perPage)
    },
    hasReachedEnd () {
      return this.results.length === this.match.length
    }
  },
  methods: {
    paginate () {
      this.page++
    }
  },
  watch: {
    query () {
      this.page = 0
    }
  }
}
</script>
