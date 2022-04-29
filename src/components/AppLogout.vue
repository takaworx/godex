<template>
  <v-dialog persistent v-model="showDialog" width="375">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item link v-bind="attrs" v-on="on">
        <v-list-item-icon>
          <v-icon>mdi-logout-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-card>
      <v-card-title>Confirm Sign-out</v-card-title>
      <v-card-text>Are you sure you want to logout of your account?</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click.prevent="showDialog = false">Cancel</v-btn>
        <v-btn text color="primary" @click.prevent="logout">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import storage from '@/abstract/storage'
import UserService from '@/services/user'

export default {
  data: () => ({
    showDialog: false
  }),
  methods: {
    async logout () {
      try {
        await UserService.logout()
        await storage.removeItem('token')
        this.$store.commit('setUser', null)
        this.$router.push({ name: 'login' })
      } catch (err) {
        console.error(err)
        alert('Something went wrong!')
      }
    }
  }
}
</script>
