<template>
  <v-layout column justify-center align-center>
    <v-container fluid>
        <v-card>
          <v-card-title>
            
            <v-row>
              <v-col cols="12" sm="4" lg="3">
                <v-btn
                  block
                  large
                  outlined
                  :color="currentTab == 'buyers'?'success':'primary'"
                  @click="showBuyers()"
                >
                  <v-icon dark>mdi-battery-charging-40</v-icon>
                  <span class="pl-3 hidden-sm-and-down">Buyers ({{ buyers.length }})</span>
                </v-btn>
              </v-col>

              <v-spacer />

              <v-col cols="12" sm="4" lg="3">
                <v-btn
                  block
                  large
                  outlined
                  :color="currentTab == 'competitions'?'success':'primary'"
                  @click="showCompetitions()"
                >
                  <v-icon dark>mdi-basket</v-icon>
                  <span class="pl-3 hidden-sm-and-down">Competitions ({{ competitions.length }})</span>
                </v-btn>
              </v-col>

              <v-spacer />

              <v-col cols="12" sm="4" lg="3" class="text-right">
                <v-btn
                  block
                  large
                  outlined
                  :color="currentTab == 'sellers'?'success':'primary'"
                  @click="showSellers()"
                >
                  <v-icon dark>mdi-plus-network</v-icon>
                  <span class="pl-3 hidden-sm-and-down">Sellers ({{ sellers.length }})</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>

          <v-card-text>
            <BuyersTab v-if="currentTab == 'buyers'" />
            <SellersTab v-if="currentTab == 'sellers'" />
          </v-card-text>
        </v-card>
    </v-container>
  </v-layout>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

import SellersTab from "~/components/SellersTab.vue";
import BuyersTab from "~/components/BuyersTab.vue";

export default {
  name: "IndexPage",
  components: {
    SellersTab,
    BuyersTab,
  },
  async asyncData({ $http, store }) {

    const loaded = {
      buyers: store.getters.isBuyersDataLoaded,
      competitions: store.getters.isCompetitionsDataLoaded,
      sellers: store.getters.isSellersDataLoaded,
      bids: store.getters.isBidsDataLoaded,
    };

    if (!loaded.buyers) {
      const buyers = await $http.$get("/api/buyers");
      store.dispatch("setBuyers", buyers);
    }

    if (!loaded.competitions) {
      const competitions = await $http.$get("/api/competitions");
      store.dispatch("setCompetitions", competitions);
    }

    if (!loaded.sellers) {
      const sellers = await $http.$get("/api/sellers");
      store.dispatch("setSellers", sellers);
    }

    if (!loaded.bids) {
      const bids = await $http.$get("/api/bids");
      store.dispatch("setBids", bids);
    }

    return {
      currentTab: "buyers",
    };
  },
  computed: {
    ...mapState({
      buyers: (state) => state.buyers,
      competitions: (state) => state.competitions,
      sellers: (state) => state.sellers,
    }),
    /*
    ...mapGetters({
      buyersReady: "isBuyersDataLoaded",
      compReady: "isCompetitionsDataLoaded",
      sellersReady: "isSellersDataLoaded",
      getSellers: "getSellers",
      getCompetitions: "getCompetitions",
      getBids: "getBids",
    }),
    */
  },
  methods: {
    showSellers() {
      this.currentTab = "sellers";
    },
    showBuyers() {
      this.currentTab = "buyers";
    },
    showCompetitions() {
      this.currentTab = "competitions";
    },
  },
};
</script>
