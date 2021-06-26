<template>
  <v-layout column justify-center align-center>
        <v-card fluid>
          <!--
          <v-card-title class="headline">
            {{ testAPI }}
          </v-card-title>
          -->
          <v-card-text>

            <v-row v-if="buyersReady">
              <v-col cols="12" sm="12">
                <p class="text-h4">Buyers ({{ buyers.length }})</p>
              </v-col>
            </v-row>

            <v-row v-if="buyersReady">
              <v-col cols="12" sm="12">
                <v-btn
                  class="ma-2"
                  v-for="(buyer, i) in buyers"
                  :key="buyer.id"
                  :color="currentBuyerColor(buyer.id)"
                  @click="clickBuyer(buyer.id, null)"
                >
                  {{ i + 1 }} - {{ buyer.id }}
                </v-btn>
              </v-col>
            </v-row>

            <v-row v-if="compReady">
              <v-col cols="12" sm="12">
                <p class="text-h4">Competitions ({{ getCompetitions.length }})</p>
              </v-col>
            </v-row>

            <v-row v-if="compReady">
              <v-col cols="12" sm="12">
                <v-btn
                  class="ma-2"
                  v-for="(comp, i) in getCompetitions"
                  :key="comp.id"
                  :color="currentCompColor(comp.id)"
                  @click="clickComp(comp.id, comp.buyer, comp.minimum_capacity)"
                >
                  {{ i + 1 }} - {{ comp.id }}<br>
                  {{ comp.minimum_capacity }}
                </v-btn>
              </v-col>
            </v-row>

            <v-row v-if="selectedCompId">
              <v-col cols="12" sm="12">
                <p class="text-h4">Bids ({{ getBids.length }})</p>
              </v-col>
            </v-row>

            <v-row v-if="selectedCompId">
              <v-col cols="12" sm="12">
                <v-btn
                  class="ma-2"
                  v-for="(bid, i) in getBids"
                  :key="bid.id"
                  :color="currentBidColor(bid.id, bid.accepted, bid.offered_capacity)"
                >
                  {{ i + 1 }} - {{ bid.id }}<br>
                  {{ bid.offered_capacity }}
                </v-btn>
              </v-col>
            </v-row>

            <v-row v-if="sellersReady">
              <v-col cols="12">
                <span class="text-h4 pr-3 pt-3 mt-1">Sellers ({{ getSellers.length }})</span>
                <v-btn 
                  outlined 
                  class="pt-0"
                  @click="ShowVerifiedSellers()"
                >
                  Show verified only
                </v-btn>
              </v-col>
            </v-row>

            <v-row v-if="sellersReady">
              <v-col cols="12" sm="12">
                <v-btn
                  class="ma-2"
                  v-for="(seller, i) in getSellers"
                  :key="seller.id"
                  :color="currentSellerColor(seller.id, seller.verified)"
                  @click="clickSeller(seller.id)"
                >
                  {{ i + 1 }} - {{ seller.id }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

  </v-layout>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "IndexPage",
  async asyncData({ $http, store }) {
    const testAPI = await $http.$get("/api/test");

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
      testAPI,
      selectedBuyerId: null,
      selectedSellerId: null,
      showVerifiedSellers: false,
      selectedCompId: null,
      compMinCapacity: null
    };
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
      compReady: "isCompetitionsDataLoaded",
      sellersReady: "isSellersDataLoaded",
      getSellers: "getSellers",
      getCompetitions: "getCompetitions",
      getBids: "getBids"
    }),
  },
  methods: {
    clickBuyer(id, compId) {
      this.selectedBuyerId = this.selectedBuyerId !== id ? id : null 
      this.$store.dispatch("selectBuyer", this.selectedBuyerId) 
      this.selectedCompId = compId 
      this.$store.dispatch("showBids", this.selectedCompId)    
    },
    currentBuyerColor(id) {
      return this.selectedBuyerId === id ? "success" : "primary"
    },
    clickSeller(id) {
      //notverifiedsuccess
      this.selectedSellerId = this.selectedSellerId !== id ? id : null  
    },
    currentSellerColor(id, verified) {
      if(verified) {
        return this.selectedSellerId === id ? "success" : "primary"
      }
      return this.selectedSellerId === id ? "notverifiedsuccess" : "notverified"
    },
    ShowVerifiedSellers() {
      this.showVerifiedSellers = !this.showVerifiedSellers
      this.$store.dispatch("showVerifiedSellers", this.showVerifiedSellers) 
    },
    currentCompColor(id) {
      return this.selectedCompId === id ? "success" : "primary"
    },
    clickComp(compId, buyerId, minCapacity) {
      this.selectedBuyerId = buyerId
      this.$store.dispatch("selectBuyer", buyerId)
      this.selectedCompId = this.selectedCompId !== compId ? compId : null 
      this.compMinCapacity = this.selectedCompId ? minCapacity : null
      this.$store.dispatch("showBids", this.selectedCompId)
    },
    currentBidColor(id, accepted, offeredCapacity) {
      if(offeredCapacity >= this.compMinCapacity) {
        return accepted ? "success" : "notverifiedsuccess"
      }
      return accepted ? "primary" : "notverified"

    }
  },
};
</script>
