<template>
  <v-app>
    <app-nav-drawer />
    <app-bar />
    <v-main>
      <router-view />
      <pokemon-card></pokemon-card>
    </v-main>
  </v-app>
</template>

<script>
import AppNavDrawer from '@/components/AppNavDrawer.vue'
import AppBar from '@/components/AppBar.vue'

import PokemonCard from '@/components/PokemonCard.vue'

export default {
  components: {
    AppNavDrawer,
    AppBar,
    PokemonCard
  },
  mounted () {
    this.$store.dispatch('pokemon/fetchPokemons')
    this.$store.dispatch('pokemon/fetchPokemonColors')
  }
}
</script>
