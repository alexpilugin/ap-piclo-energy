<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
          {{ test }}
        </v-card-title>
        <v-card-text>
          <p>
            {{ buyers }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/inspire"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "IndexPage",
  async asyncData({ $http }) {
    const test = await $http.$get('/api/test')
    const buyers = await $http.$get('/api/buyers')
    return {
      test,
      buyers
    }
  },
}
</script>
