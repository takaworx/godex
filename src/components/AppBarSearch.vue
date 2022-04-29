<template>
  <v-app-bar app dark>
    <v-btn icon @click.prevent="goToPreviousPage">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-text-field autofocus hide-details dense solo v-model="search" class="ml-1" label="Search.."></v-text-field>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    search: null,
    timer: null
  }),
  watch: {
    search (value) {
      if (!value) {
        return false
      }

      clearTimeout(this.timer)

      this.timer = setTimeout(() => {
        this.$store.commit('search/setQuery', value)
      }, 1000)
    }
  },
  methods: {
    goToPreviousPage () {
      this.$router.back()
    }
  }
}
</script>
