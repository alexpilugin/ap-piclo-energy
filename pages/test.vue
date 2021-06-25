<template>
  <section class="container">
    {{ test }}
  </section>
</template>

<script>
export default {
  name: 'TestRoute',
  async asyncData({ $http }) {
    const test = await $http.$get('/api/test')
    return {
      test,
    }
  },
}
</script>
