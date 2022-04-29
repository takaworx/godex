<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  mounted () {
    this.$store.dispatch('window/calculate')

    window.addEventListener('resize', () => {
      this.$store.dispatch('window/calculate')
    })
  }
}
</script>
