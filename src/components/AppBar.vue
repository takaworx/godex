<template>
  <component :is="appBarToShow" />
</template>

<script>
import AppBarDefault from './AppBarDefault.vue'
import AppBarSearch from './AppBarSearch.vue'

export default {
  components: {
    AppBarDefault,
    AppBarSearch
  },
  computed: {
    appBarToShow () {
      if (this.$route.name === 'search') {
        return AppBarSearch
      }

      return AppBarDefault
    }
  }
}
</script>
