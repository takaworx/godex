<template>
  <v-dialog v-model="showCardDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn outlined rounded small :dark="data.dark" class="ml-2 mt-2" v-bind="attrs" v-on="on">Tap to view</v-btn>
    </template>
    <v-card>
      <div class="text-center" :class="cardData.color">
        <v-app-bar :dark="cardData.dark" flat color="rgba(0,0,0,0)">
          <v-toolbar-title>#{{ data.id }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="showCardDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-app-bar>
        <v-avatar size="96" class="ma-2">
          <v-img :src="data.sprites.other['official-artwork'].front_default"></v-img>
        </v-avatar>
        <v-card-title class="text-uppercase d-block" :class="{ 'white--text': cardData.dark }">{{ data.name }}</v-card-title>
        <v-card-subtitle :class="{ 'white--text': cardData.dark }">{{ types }}</v-card-subtitle>
      </div>
      <v-container>
        <v-row>
          <v-col v-for="(stat, key) in data.stats" :key="key" cols="6">
            {{ stat.stat.name }}
            <v-progress-linear
              height="10"
              striped
              :value="((stat.base_stat/200)*100)"
              :color="primaryColor"
            ></v-progress-linear>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions class="mt-4 justify-center">
        <v-btn icon outlined x-large>
          <v-icon>mdi-heart-outline</v-icon>
        </v-btn>
        <v-btn icon outlined x-large>
          <v-icon>mdi-thumb-down-outline</v-icon>
        </v-btn>
        <v-btn icon outlined x-large>
          <v-icon>mdi-star-outline</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    cardData: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    showCardDialog: false
  }),
  computed: {
    primaryColor () {
      const colors = this.cardData.color.split(' ')
      return colors[0]
    },
    types () {
      const types = []

      for (let i = 0; i < this.data.types.length; i++) {
        types.push(this.data.types[i].type.name)
      }

      return types.join(', ')
    }
  }
}
</script>