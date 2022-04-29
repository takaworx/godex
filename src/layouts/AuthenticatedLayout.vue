<template>
  <v-app>
    <app-nav-drawer />
    <app-bar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppNavDrawer from '@/components/AppNavDrawer.vue'
import AppBar from '@/components/AppBar.vue'

export default {
  components: {
    AppNavDrawer,
    AppBar
  },
  mounted () {
    this.$store.dispatch('pokemon/fetchPokemons')
    this.$store.dispatch('pokemon/fetchPokemonColors')
  }
}
</script>
