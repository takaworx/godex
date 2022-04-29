<template>
  <v-container fluid>
    <v-row>
      <v-col class="mt-6 mx-auto text-center" cols="12" sm="8" md="6" lg="4">
        <v-avatar color="grey lighten-4" size="108">
          <v-icon size="72">mdi-account</v-icon>
        </v-avatar>
        <h1 class="mt-2">{{ name }}</h1>
        <div v-if="user.birthday" class="grey--text">{{ user.birthday }}</div>
        <v-form v-if="isAuthUser" :disabled="isLoading" @submit.prevent="save">
          <v-text-field rounded outlined hide-details="auto" :error-messages="$errorHandler().get('first_name')" label="First Name" type="text" class="my-4" v-model="user.first_name"></v-text-field>
          <v-text-field rounded outlined hide-details="auto" :error-messages="$errorHandler().get('last_name')" label="Last Name" type="text" class="my-4" v-model="user.last_name"></v-text-field>
          <v-dialog ref="datePickerDialog" v-model="showDatePicker" :return-value.sync="user.birthday" width="375" persistent>
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                rounded
                outlined
                v-model="user.birthday"
                :error-messages="$errorHandler().get('birthday')"
                label="Birthday"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="user.birthday"
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn text @click="showDatePicker = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.datePickerDialog.save(user.birthday)">Ok</v-btn>
            </v-date-picker>
          </v-dialog>
          <v-btn large rounded block :loading="isLoading" color="primary" type="submit">Update</v-btn>
        </v-form>
        <div class="mt-6 text-center">
          <strong>Liked Pokemons</strong>
          <div v-if="hasLikes" style="max-width: 375px" class="d-block mx-auto my-2">
            <pokemon-thumbnail class="mb-1" v-for="(pokemonId, key) in user._likes" :key="key" :id="pokemonId"></pokemon-thumbnail>
          </div>
          <div v-else style="max-width: 375px" class="d-block mx-auto my-2 text-grey">
            No record found
          </div>
        </div>
        <div class="mt-6 text-center">
          <strong>Disliked Pokemons</strong>
          <div v-if="hasDislikes" style="max-width: 375px" class="d-block mx-auto my-2">
            <pokemon-thumbnail class="mb-1" v-for="(pokemonId, key) in user._dislikes" :key="key" :id="pokemonId"></pokemon-thumbnail>
          </div>
          <div v-else style="max-width: 375px" class="d-block mx-auto my-2 text-grey">
            No record found
          </div>
        </div>
        <div class="mt-6 text-center">
          <strong>Favorite Pokemons</strong>
          <div v-if="hasFavorites" style="max-width: 375px" class="d-block mx-auto my-2">
            <pokemon-thumbnail class="mb-1" v-for="(pokemonId, key) in user._favorites" :key="key" :id="pokemonId"></pokemon-thumbnail>
          </div>
          <div v-else style="max-width: 375px" class="d-block mx-auto my-2 text-grey">
            No record found
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserService from '@/services/user'

import PokemonThumbnail from '@/components/PokemonThumbnail.vue'

export default {
  watch: {
    $route: function (newVal, oldVal) {
      if (newVal.params.id !== oldVal.params.id) {
        this.findUser()
      }
    }
  },
  data: () => ({
    user: {
      id: 0,
      first_name: null,
      last_name: null,
      birthday: null
    },
    isLoading: false,
    showDatePicker: false
  }),
  computed: {
    name () {
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
    authUser () {
      return this.$store.getters.getUser
    },
    isAuthUser () {
      return this.user?.id === this.authUser?.id
    },
    hasLikes () {
      return this.user?._likes?.length ?? false
    },
    hasDislikes () {
      return this.user?._dislikes?.length ?? false
    },
    hasFavorites () {
      return this.user?._favorites?.length ?? false
    }
  },
  components: {
    PokemonThumbnail
  },
  mounted () {
    this.findUser()
  },
  methods: {
    async findUser () {
      const user = await UserService.findUser(this.$route.params.id)
      this.user = user.data
    },
    async save () {
      this.$errorHandler().clear()
      this.isLoading = true

      try {
        const user = await UserService.updateUser({
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          birthday: this.user.birthday
        })
        this.$store.commit('setUser', user.data)
      } catch (err) {
        this.$errorHandler().set(err.data)
      }

      this.isLoading = false
    }
  }
}
</script>
