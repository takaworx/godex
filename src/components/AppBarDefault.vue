<template>
  <v-app-bar app dark>
    <v-btn icon @click.prevent="$store.dispatch('openNavDrawer')" class="d-inline-flex d-lg-none">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-toolbar-title class="pl-1">GoDex</v-toolbar-title>
    <v-spacer />
    <v-btn icon @click.prevent="$router.push({ name: 'search' })">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  }
}
</script>
