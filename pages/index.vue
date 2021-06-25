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
          <b>{{ test }}</b>
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
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "IndexPage",
  async asyncData({ $http, store }) {
    const test = await $http.$get('/api/test')

    const loaded = { 
      buyers: store.getters.isBuyersDataLoaded,
      competitions: store.getters.isCompetitionsDataLoaded,
      sellers: store.getters.isSellersDataLoaded,
      bids: store.getters.isBidsDataLoaded,
    }

    if(!loaded.buyers) {
      const buyers = await $http.$get('/api/buyers')
      store.dispatch('setBuyers', buyers)
    }

    if(!loaded.competitions) {
      const competitions = await $http.$get('/api/competitions')
      store.dispatch('setCompetitions', competitions)
    }

    if(!loaded.sellers) {
      const sellers = await $http.$get('/api/sellers')
      store.dispatch('setSellers', sellers)
    }
    
    if(!loaded.bids) {
      const bids = await $http.$get('/api/bids')
      store.dispatch('setBids', bids)
    }
      
    return {
      test
    }
  },
  computed: {
    ...mapState({
      buyers: (state) => state.buyers,
      competitions: (state) => state.competitions,
      sellers: (state) => state.sellers,
      bids: (state) => state.bids,  
    }),
    ...mapGetters({
      buyersReady: "isBuyersDataLoaded",
      competitReady: "isCompetitionsDataLoaded",
      sellersReady: "isSellersDataLoaded",
      bidsReady: "isBidsDataLoaded",
    }),   
  },
  methods: {
    ...mapActions({
      updateBuyers: "setBuyers",  
      updateCompetitions: "setCompetitions",
      updateSellers: "setSellers",
      updateBids: "setBids",
    })  
  }
}
</script>
