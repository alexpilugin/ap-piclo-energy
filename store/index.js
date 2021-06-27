import moment from 'moment'
let devMode = process.env.NODE_ENV === 'development';
const SET_BUYERS = 'SET_BUYERS';
const SET_COMPETITIONS = 'SET_COMPETITIONS'; //competitions
const SET_SELLERS = 'SET_SELLERS'; // sellers
const SET_BIDS = 'SET_BIDS'; // bids
const SHOW_VERIFIED_SELLERS = 'SHOW_VERIFIED_SELLERS'
const SELECT_BUYER = 'SELECT_BUYER'
const SHOW_BIDS = 'SHOW_BIDS'
const SELECT_SELLER = 'SELECT_SELLER'
const SHOW_SELLER_ACCEPTED_BIDS = 'SHOW_SELLER_ACCEPTED_BIDS'

export const state = () => ({
  buyers: [],
  competitions: [],
  sellers: [],
  bids: [],
  showVerifiedSellers: true,
  selectedBuyerId: null,
  selectedSellerId: null,
  selectedCompId: null,
  selectedComp: null,
  showAcceptedBids: false
})

export const getters = {
  getBuyers: (state) => state.buyers,
  getCompetitions: (state) => {
    if (!state.competitions.length || state.competitions.length == 0) return state.competitions
    if (!state.selectedBuyerId) return [...state.competitions].sort((a, b) => b.minimum_capacity - a.minimum_capacity)
    return state.competitions.filter(comp => comp.buyer === state.selectedBuyerId)
      .sort((a, b) => b.minimum_capacity - a.minimum_capacity)
  },
  getSellers: (state) => {

    const result = {
      sellers: [],
      verifiedSellers: [],
      filtered: [],
      totalSellersLength: 0,
      verifiedSellersLength: 0
    }
  
    if (!state.sellers.length || state.sellers.length == 0) return result
  
    result.sellers = [...state.sellers]
              .sort((a, b) => b.verified - a.verified || b.name - a.name)
  
    result.totalSellersLength = state.sellers.length
  
    const verifiedSellers = state.sellers.filter(seller => seller.verified)
              .sort((a, b) => b.verified - a.verified || b.name - a.name)

    const notVerifiedSellers = state.sellers.filter(seller => !seller.verified)
              .sort((a, b) => b.verified - a.verified || b.name - a.name)
  
    result.verifiedSellers = verifiedSellers
    result.verifiedSellersLength = verifiedSellers.length

    result.filtered = state.showVerifiedSellers ? verifiedSellers : notVerifiedSellers
  
    return result
  },
  getSellerBids: (state) => {
    const result = {
      bids: [],
      bidsLength: 0,
      sellerBids: [],
      sellerBidsLength: 0,
      filteredSellerBids: [],
      sellerAcceptedBidsNum: 0,
      sellerAcceptedBids: [],
      sellerNotAcceptedBids: []
    }
    if (!state.bids.length || state.bids.length == 0) return result
    
    result.bids = state.bids //all bids (5000)
    result.bidsLength = state.bids.length

    if (!state.selectedSellerId) return result

    const sellerBids = state.bids.filter(bid => {      
      if(bid.seller == state.selectedSellerId) {
        if(bid.accepted) {
          result.sellerAcceptedBids.push(bid)
          result.sellerAcceptedBidsNum++;
        } else {
          result.sellerNotAcceptedBids.push(bid)
        }
        return true
      }
    }).sort((a, b) => b.accepted - a.accepted)

    result.sellerBids = sellerBids
    result.sellerBidsLength = sellerBids.length

    result.filteredSellerBids = !state.showAcceptedBids ? result.sellerAcceptedBids : result.sellerNotAcceptedBids
    return result
  },
  // get bids for a selected competition
  getBids: (state) => {
    if (!state.bids.length || state.bids.length == 0) return []
    if (!state.selectedCompId) return []
    return state.bids.filter(bid => bid.competition == state.selectedCompId)
        .sort((a, b) => b.offered_capacity - a.offered_capacity)
  },
  getBidsInfo: (state) => {

    const sellers = state.sellers
    const minCapacity = state.selectedComp.minimum_capacity

    const startDate = moment(state.selectedComp.open)
    const endDate = moment(state.selectedComp.closed)
 
    const ms = moment.duration(endDate.diff(startDate))
    const d = moment.duration(ms);

    const durationString = d.days() + ':' + d.hours() + ':' + d.minutes()

    const result = {
      bids: [],
      bidsTotal: [],
      bidsAccepted: [],
      bidsEnoughCapacity: [],
      numTotalBids: 0,
      numBidsAccepted: 0,
      numBidsEnoughCapacity: 0,
      numBidsVerifiedSeller: 0,
      compOpenString: startDate.format('MMMM Do YYYY, h:mm:ss a'),
      compClosedString: endDate.format('MMMM Do YYYY, h:mm:ss a'),
      durationHours: durationString,
    }

    if (!state.selectedCompId || !state.bids.length || state.bids.length == 0) return result

    result.bids = state.bids.filter(bid => {
      if (bid.competition == state.selectedCompId) {
        result.numTotalBids++;
        result.bidsTotal.push(bid)
        if (bid.accepted) {
          result.numBidsAccepted++;
          result.bidsAccepted.push(bid)
          if (bid.offered_capacity >= minCapacity) {
            result.numBidsEnoughCapacity++;
            result.bidsEnoughCapacity.push(bid)
            const verified = sellers.find(s => s.id === bid.seller).verified;
            if (verified) {
              result.numBidsVerifiedSeller++;
              const isBetween = moment(bid.created).isBetween(startDate, endDate)
              if (isBetween) return true
            }
          }
        }
      }
    }).sort((a, b) => b.offered_capacity - a.offered_capacity);

    return result
  },
  isBuyersDataLoaded: (state) => {
    return state.buyers.length && state.buyers.length > 0 ? true : false
  },
  isCompetitionsDataLoaded: (state) => {
    return state.competitions.length && state.competitions.length > 0 ? true : false
  },
  isSellersDataLoaded: (state) => {
    return state.sellers.length && state.sellers.length > 0 ? true : false
  },
  isBidsDataLoaded: (state) => {
    return state.bids.length && state.bids.length > 0 ? true : false
  },
  getCompetitionById: (state) => {
    const competitions = state.competitions
    function findCompetition(id) {
      return competitions.find(s => s.id === id)
    }
    return findCompetition
  }
}

export const mutations = {
  [SET_BUYERS]: (state, buyers) => {
    if (devMode) console.log("Mutation: SET_BUYERS");
    state.buyers = buyers;
  },
  [SET_COMPETITIONS]: (state, competitions) => {
    if (devMode) console.log("Mutation: SET_COMPETITIONS");
    state.competitions = competitions;
  },
  [SET_SELLERS]: (state, sellers) => {
    if (devMode) console.log("Mutation: SET_SELLERS");
    state.sellers = sellers;
  },
  [SET_BIDS]: (state, bids) => {
    if (devMode) console.log("Mutation: SET_BIDS");
    state.bids = bids;
  },
  [SHOW_VERIFIED_SELLERS]: (state, show) => {
    if (devMode) console.log("Mutation: SHOW_VERIFIED_SELLERS");
    state.showVerifiedSellers = show;
  },
  [SELECT_BUYER]: (state, buyerId) => {
    if (devMode) console.log("Mutation: SELECT_BUYER");
    state.selectedBuyerId = buyerId;
  },
  [SHOW_BIDS]: (state, payload) => {
    if (devMode) console.log("Mutation: SHOW_BIDS", payload);
    if (!payload) {
      state.selectedCompId = null;
      state.selectedComp = null
    } else {
      state.selectedCompId = payload.selectedComp.id;
      state.selectedComp = payload.selectedComp
    }
  },
  [SELECT_SELLER]: (state, sellerId) => {
    if (devMode) console.log("Mutation: SELECT_SELLER", sellerId); 
    state.selectedSellerId = sellerId
  },
  [SHOW_SELLER_ACCEPTED_BIDS]: (state, show) => {
    if (devMode) console.log("Mutation: SHOW_SELLER_ACCEPTED_BIDS");
    state.showAcceptedBids = show;
  },
}

export const actions = {
  setBuyers: (context, buyers) => {
    if (devMode) console.log("Action: setBuyers");
    context.commit(SET_BUYERS, buyers)
  },
  setCompetitions: (context, competitions) => {
    if (devMode) console.log("Action: setCompetitions");
    context.commit(SET_COMPETITIONS, competitions)
  },
  setSellers: (context, sellers) => {
    if (devMode) console.log("Action: setSellers");
    context.commit(SET_SELLERS, sellers)
  },
  setBids: (context, bids) => {
    if (devMode) console.log("Action: setBids");
    context.commit(SET_BIDS, bids)
  },
  showVerifiedSellers: (context, show) => {
    if (devMode) console.log("Action: showVerifiedSellers");
    context.commit(SHOW_VERIFIED_SELLERS, show)
  },
  selectBuyer: (context, buyerId) => {
    if (devMode) console.log("Action: selectBuyer");
    context.commit(SELECT_BUYER, buyerId)
  },
  showBids: (context, payload) => {
    if (devMode) console.log("Action: showBids", payload);
    context.commit(SHOW_BIDS, payload)
  },
  selectSeller: (context, sellerId) => {
    if (devMode) console.log("Action: selectSeller");
    context.commit(SELECT_SELLER, sellerId) 
  },
  toggleShowAcceptedSellerBids: (context, show) => {
    if (devMode) console.log("Action: toggleShowAcceptedSellerBids");
    context.commit(SHOW_SELLER_ACCEPTED_BIDS, show)
  }
}