<template>
  <div class="sellers-tab mt-5">
    <v-row v-if="sellersReady">
      <v-col cols="12">
        <span class="text-h4 pr-3 ">
          Total Sellers: {{ getSellers.totalSellersLength }}, verified: {{getSellers.verifiedSellersLength}}
        </span>
        <v-btn outlined class="mb-3" @click="showVerifiedSellers()">
          {{ showVerifiedS ? "Show Not Verified" : " Show Verified" }}
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="sellersReady">
      <v-col 
        cols="12"
        sm="4"
        md="3"
        lg="2"
        xl="1"
        v-for="(seller, i) in getSellers.filtered"
        :key="seller.id"
      >
        <v-btn
          block
          outlined
          :color="currentSellerColor(seller.id, seller.verified)"
          @click="clickSeller(seller)"
        >
          {{ i + 1 }} - {{ seller.id }}<br />
          <!-- {{ seller.verified ? "verified" : "not" }} -->
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="sellersReady && selectedSellerId !== null && selectedSeller !== null">
      <v-col cols="12" sm="12">
        <p>
          <span class="text-h4 pr-3 ">
            Selected Seller has {{ getSellerBids.sellerBidsLength }} bids, accepted: {{ getSellerBids.sellerAcceptedBidsNum}}
          </span>
          <v-btn outlined class="mb-3" @click="showAcceptedSellerBids()">
            {{ !showAcceptedBids ? "Show Not Accepted" : " Show Accepted" }}
          </v-btn>
        </p>
        <p class="text-h5">
          <span class="primary--text">Name: </span> {{ selectedSeller.name }}
        </p>
        <p class="text-h5">
          <span class="primary--text">Verified: </span> {{ selectedSeller.verified ? "Yes" : "Not" }}
        </p>
      </v-col>
    </v-row>

    <v-row v-if="selectedSellerId" class="mt-5 pa-5">
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="(bid, i) in getSellerBids.filteredSellerBids"
        :key="bid.id"
      >
      <div :class="getClass(bid)">
        {{ i + 1 }} - {{ bid.id }}<br />
        Offered Capacity: {{ bid.offered_capacity }} MW<br />
        Value: {{ bid.value }}
      </div>
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
      selectedSeller: null
    }
  },
  mounted() {
    if (!this.selectedSeller) {
      // reset
      this.$store.dispatch("selectSeller", null);
    }
  },
  computed: {
    ...mapState({
      buyers: (state) => state.buyers,
      competitions: (state) => state.competitions,
      sellers: (state) => state.sellers,
      bids: (state) => state.bids,
      showVerifiedS: (state) => state.showVerifiedSellers,
      selectedSellerId: (state) => state.selectedSellerId,
      showAcceptedBids: (state) => state.showAcceptedBids
    }),
    ...mapGetters({
      buyersReady: "isBuyersDataLoaded",
      compReady: "isCompetitionsDataLoaded",
      sellersReady: "isSellersDataLoaded",
      getSellers: "getSellers",
      getCompetitions: "getCompetitions",
      getSellerBids: "getSellerBids"
    }),
  },
  methods: {
    getClass(bid) {
      return bid.accepted ? 'seller-bid-info accepted' : 'seller-bid-info'
    },
    showAcceptedSellerBids() {
      const inverse = !this.showAcceptedBids
      this.$store.dispatch("toggleShowAcceptedSellerBids", inverse)
    },
    showVerifiedSellers() {
      const inverse = !this.showVerifiedS
      this.$store.dispatch("showVerifiedSellers", inverse)
      this.$store.dispatch("selectSeller", null)
    },
    currentSellerColor(id, verified) {
      if(verified) {
        return this.selectedSellerId === id ? "success" : "primary"
      }
      return this.selectedSellerId === id ? "notverifiedsuccess" : "notverified"
    },
    clickSeller(seller) {
      this.selectedSeller = seller
      const ss = this.selectedSellerId !== seller.id ? seller.id : null 
      this.$store.dispatch("selectSeller", ss); 
      this.$store.dispatch("toggleShowAcceptedSellerBids", false)
    },
  }
};
</script>

<style>
.seller-bid-info {
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 4px;
  border: solid 1px #1976d2;
  color: #1976d2;
  font-size: 1.2rem;
}
.seller-bid-info.accepted {
  border: solid 1px #4caf50;
  color: #4caf50;  
}
</style>