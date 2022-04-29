<template>
  <v-navigation-drawer app disable-resize-watcher v-model="isNavDrawerOpen">
    <v-list>
      <v-list-item>
        <v-list-item-avatar color="grey lighten-3">
          <v-img v-if="userDisplayPhoto" :src="userDisplayPhoto" />
          <v-icon v-else size="24">mdi-account</v-icon>
        </v-list-item-avatar>
      </v-list-item>
      <v-list-item link :to="{ name: 'user', params: { id: user.id } }">
        <v-list-item-content>
          <v-list-item-title class="text-h6">{{ userName }}</v-list-item-title>
          <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider />
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
      <app-logout  />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import AppLogout from '@/components/AppLogout.vue'

export default {
  components: {
    AppLogout
  },
  computed: {
    device () {
      return this.$store.getters['window/getDevice']
    },
    isDeviceDesktop () {
      if (this.device === 'desktop' || this.device === 'large-desktop') {
        return true
      }

      return false
    },
    user () {
      return this.$store.getters.getUser
    },
    userName () {
      let name = ''

      if (this.user.first_name === '' && this.user.last_name === '') {
        return `User#${this.user.id}`
      }

      if (this.user.first_name !== '') {
        name += this.user.first_name
      }

      if (this.user.last_name !== '') {
        name += ' ' + this.user.last_name
      }

      return name
    },
    userDisplayPhoto () {
      return this.user?.display_photo ?? null
    },
    isNavDrawerOpen: {
      get () {
        return this.$store.getters.getNavDrawerOpen || this.isDeviceDesktop
      },
      set (val) {
        return val ? this.$store.dispatch('openNavDrawer') : this.$store.dispatch('closeNavDrawer')
      }
    }
  }
}
</script>
