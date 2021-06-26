<template>
  <div>
    <v-row v-if="sellersReady">
      <v-col cols="12">
        <span class="text-h4 pr-3 pt-3 mt-1"
          >Sellers ({{ getSellers.length }})</span
        >
        <v-btn outlined class="pt-0" @click="ShowVerifiedSellers()">
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
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "SellersTab",
  data() {
    return {
      showVerifiedSellers: false,
      selectedSellerId: false
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
      compReady: "isCompetitionsDataLoaded",
      sellersReady: "isSellersDataLoaded",
      getSellers: "getSellers",
      getCompetitions: "getCompetitions",
      getBids: "getBids"
    }),
  },
  methods: {
    ShowVerifiedSellers() {
      this.showVerifiedSellers = !this.showVerifiedSellers
      this.$store.dispatch("showVerifiedSellers", this.showVerifiedSellers) 
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
  }
};
</script>

<style>
</style>