<template>
  <v-app dark>

    <AppBar />

    <v-main>
      <v-container fluid>
        <nuxt keep-alive />
      </v-container>
    </v-main>

    <Footer />

  </v-app>
</template>

<script>
import AppBar from '~/components/AppBar.vue'
import Footer from '~/components/Footer.vue'

export default {
  name: "DefaultLayout",
  components: {
    AppBar,
    Footer
  }
}
</script>
