<template>
  <v-btn :color="color" @click.prevent="favorite" icon outlined x-large>
    <v-icon>{{ icon }}</v-icon>
    <v-snackbar v-model="toastShow">
      {{ toastMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click.stop="toastShow = false"
        >
          OK
        </v-btn>
      </template>
    </v-snackbar>
  </v-btn>
</template>

<script>
import PokemonService from '@/services/pokemon'

export default {
  props: {
    targetId: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    toastShow: false,
    toastMessage: null
  }),
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    isFavorite () {
      return this.user._favorites.indexOf(this.targetId) !== -1
    },
    icon () {
      return this.isFavorite ? 'mdi-star' : 'mdi-star-outline'
    },
    color () {
      return this.isFavorite ? 'orange' : null
    }
  },
  methods: {
    async  favorite () {
      try {
        const favorite = await PokemonService.favorite(this.targetId)
        this.$store.commit('setUser', favorite.data)
      } catch (err) {
        this.toastMessage = err.message
        this.toastShow = true
      }
    }
  }
}
</script>
