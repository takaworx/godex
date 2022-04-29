<template>
  <v-dialog v-model="showCardDialog" :fullscreen="isMobile" width="375" :hide-overlay="isMobile" transition="dialog-bottom-transition">
    <v-card>
      <div class="text-center" :class="cardData.color">
        <v-app-bar :dark="cardData.dark" flat color="rgba(0,0,0,0)">
          <v-toolbar-title v-if="data">#{{ data.id }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="showCardDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-app-bar>
        <v-avatar size="96" class="ma-2">
          <v-img v-if="data" :src="data.sprites.other['official-artwork'].front_default"></v-img>
        </v-avatar>
        <v-card-title v-if="data" class="text-uppercase d-block" :class="{ 'white--text': cardData.dark }">{{ data.name }}</v-card-title>
        <v-card-subtitle :class="{ 'white--text': cardData.dark }">{{ types }}</v-card-subtitle>
      </div>
      <v-container>
        <v-row v-if="data">
          <v-col v-for="(stat, key) in data.stats" :key="key" cols="6">
            {{ stat.stat.name }}
            <v-progress-linear
              height="10"
              striped
              :value="((stat.base_stat/200)*100)"
              :color="primaryColor"
            ></v-progress-linear>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions class="mt-4 justify-center" :class="{ 'pb-4': !isMobile }">
        <action-like v-if="data" :targetId="data.id"></action-like>
        <action-dislike v-if="data" :targetId="data.id"></action-dislike>
        <action-favorite v-if="data" :targetId="data.id"></action-favorite>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ActionLike from '@/components/ActionLike.vue'
import ActionDislike from '@/components/ActionDislike.vue'
import ActionFavorite from '@/components/ActionFavorite.vue'

export default {
  components: {
    ActionLike,
    ActionDislike,
    ActionFavorite
  },
  computed: {
    data () {
      return this.$store.getters['pokemon/getActiveCard']
    },
    pokemonColorData () {
      if (!this.data) {
        return null
      }

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
    cardData () {
      return {
        color: this.cardColor,
        dark: this.cardColor !== 'grey lighten-3'
      }
    },
    primaryColor () {
      const colors = this.cardData.color.split(' ')
      return colors[0]
    },
    types () {
      if (!this.data) {
        return null
      }

      const types = []

      for (let i = 0; i < this.data.types.length; i++) {
        types.push(this.data.types[i].type.name)
      }

      return types.join(', ')
    },
    isMobile () {
      return window.innerWidth < 960
    },
    showCardDialog: {
      get () {
        return this.data !== null
      },
      set () {
        this.$store.commit('pokemon/setActiveCard', null)
      }
    }
  }
}
</script>
