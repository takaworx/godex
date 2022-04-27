<template>
  <v-btn :disabled="isLiked" :color="color" @click.prevent="like" icon outlined x-large>
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
    isLiked () {
      return this.user._likes.indexOf(this.targetId) !== -1
    },
    isDisliked () {
      return this.user._dislikes.indexOf(this.targetId) !== -1
    },
    icon () {
      return this.isDisliked ? 'mdi-thumb-down' : 'mdi-thumb-down-outline'
    },
    color () {
      return this.isDisliked ? 'red' : null
    }
  },
  methods: {
    async  like () {
      try {
        const like = await PokemonService.dislike(this.targetId)
        this.$store.commit('setUser', like.data)
      } catch (err) {
        this.toastMessage = err.message
        this.toastShow = true
      }
    }
  }
}
</script>
