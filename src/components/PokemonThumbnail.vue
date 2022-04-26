<template>
  <div class="pokemon-card">
    <div v-if="loaded" class="pokemon-card-details">
      <v-card :dark="cardData.dark" :color="cardData.color">
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="text-uppercase py-2">{{ data.name }}</v-card-title>
            <v-card-actions>
              <v-btn outlined rounded dark small class="ml-2 mt-2">Tap to view</v-btn>
            </v-card-actions>
          </div>
          <v-avatar size="96" class="ma-2">
            <v-img :src="data.sprites.other['official-artwork'].front_default"></v-img>
          </v-avatar>
        </div>
      </v-card>
    </div>
    <v-skeleton-loader v-else type="image, article" />
  </div>
</template>

<script>
import PokemonApi from '@/services/pokemon-api'

export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data: () => ({
    data: null
  }),
  mounted () {
    this.getPokemonData()
  },
  methods: {
    async getPokemonData () {
      this.data = await PokemonApi.getPokemonByName(this.name)
    }
  },
  computed: {
    loaded () {
      return this.data !== null
    },
    colorData () {
      return this.$store.getters['pokemon/getColors'].find(color => color.pokemons.find(pokemon => pokemon.name === this.name))?.name
    },
    cardData () {
      return {
        color: this.cardColor,
        dark: this.cardColor !== 'grey'
      }
    },
    cardColor () {
      switch (this.colorData) {
        case 'black':
          return 'black lighten-4'
        case 'blue':
          return 'blue'
        case 'brown':
          return 'brown'
        case 'green':
          return 'green'
        case 'pink':
          return 'pink'
        case 'purple':
          return 'purple'
        case 'red':
          return 'red'
        case 'yellow':
          return 'orange'
        case 'white':
        case 'gray':
        case 'grey':
        default:
          return 'grey lighten-3'
      }
    }
  }
}
</script>
