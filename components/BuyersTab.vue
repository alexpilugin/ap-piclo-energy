<template>
  <div>
    <v-row v-if="buyersReady">
      <v-col cols="12">
        <span class="text-h4 pr-3 pt-3 mt-1">
          {{ getBuyers.length }} Buyers 
        </span>
      </v-col>
    </v-row>

    <v-row v-if="buyersReady">
      <v-col
        cols="12"
        sm="4"
        md="3"
        lg="2"
        v-for="(buyer, i) in buyers"
        :key="buyer.id"
      >
        <v-btn
          block
          class="ma-0"
          outlined
          :color="currentBuyerColor(buyer.id)"
          @click="clickBuyer(buyer.id, null)"
        >
          {{ i + 1 }} - {{ buyer.id }}
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="compReady && selectedBuyerId !== null">
      <v-col cols="12" sm="12">
        <p class="text-h4">
          Selected Buyer has {{ getCompetitions.length }} Competitions
        </p>
      </v-col>
    </v-row>

    <v-row v-if="compReady && selectedBuyerId !== null">
      <v-col
        cols="12"
        sm="4"
        md="3"
        lg="2"
        v-for="(comp, i) in getCompetitions"
        :key="comp.id"
      >
        <v-btn
          block
          outlined
          :color="currentCompColor(comp.id)"
          @click="clickComp(comp)"
        >
          {{ i + 1 }} - {{ comp.id }}<br />
          {{ comp.minimum_capacity }}
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="selectedCompId">
      <v-col cols="12" sm="12">
        <p class="text-h4">
          Selected Competition has {{ getBids.length }} Bids. 
        </p>
        <p class="text-h5">
          <span class="primary--text">Name:</span> {{ selectedComp.name }}
        </p>
        <p class="text-h5">
          <span class="primary--text">Currency:</span> {{ selectedComp.currency }}
        </p>
        <p class="text-h5">
          <span class="primary--text">Minimum Capacity:</span> {{ selectedComp.minimum_capacity }}
        </p>
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
          {{ i + 1 }} - {{ bid.id }}<br />
          {{ bid.offered_capacity }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "BuyersTab",
  data() {
    return {
      selectedComp: null,
      selectedBuyerId: null,
      showVerifiedSellers: false,
      selectedCompId: null,
      compMinCapacity: null,
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
      getBuyers: "getBuyers",
      getCompetitions: "getCompetitions",
      getBids: "getBids",
    }),
  },
  methods: {
    clickBuyer(id, compId) {
      this.selectedComp = null;
      this.selectedBuyerId = this.selectedBuyerId !== id ? id : null;
      this.$store.dispatch("selectBuyer", this.selectedBuyerId);
      this.selectedCompId = compId;
      this.$store.dispatch("showBids", this.selectedCompId);
    },
    currentBuyerColor(id) {
      return this.selectedBuyerId === id ? "success" : "primary";
    },
    currentCompColor(id) {
      return this.selectedCompId === id ? "success" : "primary";
    },
    clickComp(comp) {
      this.selectedComp = comp;
      this.selectedBuyerId = comp.buyer;
      this.$store.dispatch("selectBuyer", comp.buyer);
      this.selectedCompId = this.selectedCompId !== comp.id ? comp.id : null;
      this.compMinCapacity = this.selectedCompId ? comp.minimum_capacity : null;
      this.$store.dispatch("showBids", this.selectedCompId);
    },
    currentBidColor(id, accepted, offeredCapacity) {
      if (offeredCapacity >= this.compMinCapacity) {
        return accepted ? "success" : "notverifiedsuccess";
      }
      return accepted ? "primary" : "notverified";
    }
  }
};
</script>

<style>
</style>