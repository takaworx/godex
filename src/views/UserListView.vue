<template>
  <v-container fluid class="pa-0 mt-4">
    <v-row no-gutters justify="center">
      <v-col cols="12" sm="10" md="8" lg="6" class="text-center">
        <h2>User List</h2>
      </v-col>
    </v-row>
    <v-row no-gutters justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-list v-if="users.length">
          <template v-for="(user, key) in users">
            <v-list-item link :to="{ name: 'user', params: { id: user.id } }" :key="`item-${key}`">
              <v-list-item-avatar v-if="user.display_photo">
                <v-img :src="user.display_photo" />
              </v-list-item-avatar>
              <v-list-item-icon v-else>
                <v-avatar color="grey lighten-3">
                  <v-icon>mdi-account</v-icon>
                </v-avatar>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ getName(user) }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>mdi-chevron-right</v-icon>
              </v-list-item-action>
            </v-list-item>
            <v-divider :key="`divider-${key}`"></v-divider>
          </template>
        </v-list>
        <div v-if="!hasReachedLastPage" class="text-center">
          <v-progress-circular indeterminate v-intersect="getUserList"></v-progress-circular>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserService from '@/services/user'

export default {
  data: () => ({
    page: 0,
    lastPage: null,
    users: []
  }),
  computed: {
    getName: () => (user) => {
      let name = ''

      if (user.first_name === '' && user.last_name === '') {
        return `User#${user.id}`
      }

      if (user.first_name !== '') {
        name += user.first_name
      }

      if (user.last_name !== '') {
        name += ' ' + user.last_name
      }

      return name
    },
    hasReachedLastPage () {
      return this.lastPage !== null && this.page >= this.lastPage
    }
  },
  methods: {
    async getUserList () {
      if (this.hasReachedLastPage) {
        return false
      }

      try {
        this.page++
        const result = await UserService.getUserList(this.page)
        this.users = this.users.concat(result.data.data)
        this.lastPage = result.data.last_page
      } catch (err) {
        alert('Something went wrong!')
        console.error(err)
      }
    }
  }
}
</script>
