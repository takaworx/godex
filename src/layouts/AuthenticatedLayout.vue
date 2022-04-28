<template>
  <v-app>
    <v-navigation-drawer app disable-resize-watcher v-model="isNavDrawerOpen" class="d-sm-none">
      <v-list>
        <v-list-item link exact :to="{ name: 'home' }">
          <v-list-item-icon>
            <v-icon>mdi-home-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Pokemons</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link exact :to="{ name: 'user-list' }">
          <v-list-item-icon>
            <v-icon>mdi-account-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>User List</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app dark>
      <v-btn icon @click.prevent="$store.dispatch('openNavDrawer')" class="d-inline-flex d-sm-none">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title class="pl-1">GoDex</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items class="d-none d-sm-inline-flex mr-1">
        <v-btn text link exact :to="{ name: 'home' }">Pokemons</v-btn>
        <v-btn text link exact :to="{ name: 'user-list' }">User List</v-btn>
      </v-toolbar-items>
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
    },
    isNavDrawerOpen: {
      get () {
        return this.$store.getters.getNavDrawerOpen
      },
      set (val) {
        return val ? this.$store.dispatch('openNavDrawer') : this.$store.dispatch('closeNavDrawer')
      }
    }
  },
  mounted () {
    this.$store.dispatch('pokemon/fetchPokemons')
    this.$store.dispatch('pokemon/fetchPokemonColors')
  }
}
</script>
