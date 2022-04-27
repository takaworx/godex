<template>
  <v-container fluid class="text-center">
    <v-row>
      <v-col cols="12">
        <v-form class="auth-form" @submit.prevent="register" :disabled="isLoading">
          <h1 class="mb-5">GoDex</h1>
          <v-text-field autofocus rounded outlined hide-details="auto" :error-messages="$errorHandler().get('email')" label="Email" type="email" class="my-4" v-model="email" />
          <v-text-field rounded outlined hide-details="auto" :error-messages="$errorHandler().get('password')" label="Password" type="password" class="my-4" v-model="password" />
          <v-text-field rounded outlined hide-details="auto" :error-messages="$errorHandler().get('password_confirmation')" label="Confirm Password" type="password" class="my-4" v-model="passwordConfirmation" />
          <v-btn large rounded block :loading="isLoading" color="primary" type="submit">Register</v-btn>
        </v-form>
        <div class="mt-8 text-center">Already an existing user? <router-link :to="{ name: 'login' }">Login</router-link></div>
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
    password: null,
    passwordConfirmation: null
  }),
  methods: {
    async register () {
      this.$errorHandler().clear()
      this.isLoading = true

      try {
        await UserService.register(this.email, this.password, this.passwordConfirmation)
        const login = await UserService.login(this.email, this.password)
        await UserService.saveAccessToken(login.data.access_token)
        this.$router.push({ name: 'home' })
      } catch (err) {
        this.$errorHandler().set(err.data)
        this.password = null
        this.passwordConfirmation = null
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
