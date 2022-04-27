<template>
  <v-app>
    <v-app-bar app dark>
      <v-btn icon>
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title class="pl-1">GoDex</v-toolbar-title>
      <v-spacer />
      <v-btn icon link :to="{ name: 'user', params: { id: user.id } }">
        <v-icon>mdi-account-outline</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  mounted () {
    this.$store.dispatch('pokemon/fetchPokemons')
    this.$store.dispatch('pokemon/fetchPokemonColors')
  }
}
</script>
