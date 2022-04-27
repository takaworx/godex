<template>
  <div class="pokemon-thumbnail">
    <div v-if="loaded" class="pokemon-card-details">
      <v-card :dark="cardData.dark" :color="cardData.color">
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="text-uppercase py-2">{{ data.name }}</v-card-title>
            <v-card-actions>
              <pokemon-card :data="data" :cardData="cardData" />
            </v-card-actions>
          </div>
          <v-avatar size="96" class="ma-2">
            <v-img :src="data.sprites.other['official-artwork'].front_default"></v-img>
          </v-avatar>
        </div>
      </v-card>
    </div>
    <v-skeleton-loader v-else type="list-item-avatar-three-line" />
  </div>
</template>

<script>
import PokemonApi from '@/services/pokemon-api'
import PokemonCard from '@/components/PokemonCard.vue'

export default {
  props: {
    id: {
      type: Number,
      required: false
    },
    name: {
      type: String,
      required: false,
      default: ''
    }
  },
  data: () => ({
    data: null
  }),
  mounted () {
    if (this.id) {
      this.getPokemonData(this.id)
    } else {
      this.getPokemonData(this.name)
    }
  },
  methods: {
    async getPokemonData (name) {
      this.data = await PokemonApi.getPokemonByName(name)
    },
    fetchDataFromStore () {
      this.$store.getters['pokemon/getPokemons'].find()
    }
  },
  components: {
    PokemonCard
  },
  computed: {
    loaded () {
      return this.data !== null
    },
    colorData () {
      return this.$store.getters['pokemon/getColors'].find(color => color.pokemons.find(pokemon => pokemon.name === this.data.name))?.name
    },
    cardData () {
      return {
        color: this.cardColor,
        dark: this.cardColor !== 'grey lighten-3'
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

<style lang="scss" scoped>
.pokemon-thumbnail {
  margin: 0 auto;
  max-width: 296px;

  @media (min-width: 600px) {
    max-width: unset;
  }
}
</style>
