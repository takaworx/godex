<template>
  <v-container fluid class="text-center">
    <v-row>
      <v-col cols="12">
        <v-form class="auth-form" @submit.prevent="login">
          <h1 class="mb-5">GoDex</h1>
          <v-text-field autofocus rounded outlined hide-details="auto" :error-messages="this.$errorHandler().get('email')" label="Email" type="email" class="my-4" v-model="email" />
          <v-text-field rounded outlined hide-details="auto" :error-messages="this.$errorHandler().get('password')" label="Password" type="password" class="my-4" v-model="password" />
          <v-btn large rounded block color="primary" type="submit">Login</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserService from '@/services/user'

export default {
  data: () => ({
    isLoading: false,
    email: null,
    password: null
  }),
  methods: {
    async login () {
      this.isLoading = true

      try {
        const login = await UserService.login(this.email, this.password)
        await UserService.saveAccessToken(login.data.access_token)
        this.$router.push({ name: 'home' })
      } catch (err) {
        this.$errorHandler().set(err.data)
      }

      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.auth-form {
  margin: 0 auto;
  max-width: 296px;
}
</style>
