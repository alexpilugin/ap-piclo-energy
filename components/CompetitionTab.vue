<template>
  <div v-if="compReady">
    <v-row>
      <v-col cols="12">
        <span class="text-h4 pr-3 pt-3 mt-1">
          {{ getCompetitions.length }} Competitions
        </span>
      </v-col>
    </v-row>
    <v-row>
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
          {{ comp.minimum_capacity }} MW
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="compReady && selectedCompId !== null">
      <v-col cols="12" sm="12">
        <p class="text-h4">
          All {{ getCompetitions.length }} Competitions have the same Buyer
        </p>
        <p class="text-h5">
          <span class="primary--text">Name: </span> {{ getBuyerById(selectedComp.buyer).name }}
        </p>
      </v-col>
    </v-row>

    <div v-if="selectedCompId" class="comp-info mt-5 pa-5">
      <v-row>
        <v-col cols="12" sm="12">
          <p class="text-h4">
            Selected Competition has {{ getBidsInfo.bids.length }} Bids.
          </p>
          <p class="text-h5">
            <span class="primary--text">Name: </span> {{ selectedComp.name }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <p class="text-h5">
            <span class="primary--text">Currency: </span> {{ selectedComp.currency}}<br />
            <span class="primary--text">Minimum Capacity: </span>{{ selectedComp.minimum_capacity }} MW
          </p>
          <p class="text-h5"></p>
          <p class="text-h5">
            <span class="primary--text">Start: </span>{{ getBidsInfo.compOpenString }}<br />
            <span class="primary--text">End: </span>{{ getBidsInfo.compClosedString }}<br />
            <span class="primary--text">Duration (d:h:m): </span>{{ getBidsInfo.durationHours }}
          </p>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <p class="text-h5">
            <span class="primary--text">Total Bids: </span>{{ getBidsInfo.numTotalBids }}<br />
            <span class="primary--text">Accepted Bids: </span>{{ getBidsInfo.numBidsAccepted }}<br />
            <span class="primary--text">Bids with acceptable capacity: </span>{{ getBidsInfo.numBidsEnoughCapacity }}<br />
            <span class="primary--text">Bids with verified sellers: </span>{{ getBidsInfo.numBidsVerifiedSeller }}<br />
            <span class="primary--text">In time range: </span>{{ getBidsInfo.bids.length }}<br />
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="(bid, i) in getBidsInfo.bids"
          :key="bid.id"
        >
        <div class="comp-bid-info">
          SellerId: {{ bid.seller }}<br />
          {{ i + 1 }} - {{ bid.id }}<br />
          {{ bid.offered_capacity }} MW<br />
          {{ bid.value }} {{ selectedComp.currency }}
        </div>
        </v-col>
      </v-row>
    </div>

  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "CompetitionsTab",
  data() {
    return {
      selectedComp: null,
      selectedCompId: null,
      compMinCapacity: null
    };
  },
  mounted() {
    if (!this.selectedComp) {
      // reset
      this.$store.dispatch("selectBuyer", null);
      this.$store.dispatch("showBids", null);
    }
  },
  computed: {
    ...mapState({
      buyers: (state) => state.buyers,
      competitions: (state) => state.competitions,
      sellers: (state) => state.sellers,
      bids: (state) => state.bids,
      selectedBuyerId: (state) => state.selectedBuyerId
    }),
    ...mapGetters({
      compReady: "isCompetitionsDataLoaded",
      getCompetitions: "getCompetitions",
      getBuyerById: "getBuyerById",
      getBidsInfo: "getBidsInfo"
    })
  },
  methods: {
    currentCompColor(id) {
      return this.selectedCompId === id ? "success" : "primary";
    },
    clickComp(comp) {
      this.selectedComp = comp;
      this.$store.dispatch("selectBuyer", comp.buyer);
      this.selectedCompId = this.selectedCompId !== comp.id ? comp.id : null;
      this.compMinCapacity = this.selectedCompId ? comp.minimum_capacity : null;
      this.selectedCompId ? this.$store.dispatch("selectBuyer", comp.buyer) : this.$store.dispatch("selectBuyer", null)
      this.$store.dispatch("showBids", { selectedComp: comp });
    }
  }
}
</script>

<style>

</style>