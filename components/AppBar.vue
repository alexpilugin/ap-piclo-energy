<template>
  <v-app-bar :clipped-left="true" fixed app>
    <v-toolbar-title v-text="title" />
    <v-spacer />
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",
  data () {
    return {
      title: 'Technical Assignment'
    }
  }
};
</script>