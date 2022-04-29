<template>
  <div class="pokemon-thumbnail">
    <div v-if="loaded" class="pokemon-card-details">
      <a
        v-ripple="{ class: cardClass.text }"
        href="#"
        class="d-block pa-2 rounded-lg text-center text-capitalize text-decoration-none"
        :class="cardClass.bg"
        @click.prevent="openInCard"
      >
        <v-avatar size="96" class="ma-2">
          <v-img :src="data.sprites.other['official-artwork'].front_default"></v-img>
        </v-avatar>
        <p :class="cardClass.text">{{ data.name }}</p>
      </a>
    </div>
    <v-skeleton-loader v-else type="list-item-avatar-three-line" />
  </div>
</template>

<script>
import PokemonApi from '@/services/pokemon-api'

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
    openInCard () {
      this.$store.commit('pokemon/setActiveCard', this.data)
    }
  },
  computed: {
    loaded () {
      return this.data !== null
    },
    pokemonColorData () {
      return this.$store.getters['pokemon/getColors'].find(color => color.pokemons.find(pokemon => pokemon.name === this.data.name))?.name
    },
    cardColor () {
      switch (this.pokemonColorData) {
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
    },
    cardClass () {
      return {
        bg: this.cardColor,
        text: this.cardColor !== 'grey lighten-3' ? 'white--text' : 'black--text'
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
