let devMode = process.env.NODE_ENV === 'development';
const SET_BUYERS = 'SET_BUYERS';
const SET_COMPETITIONS = 'SET_COMPETITIONS'; //competitions
const SET_SELLERS = 'SET_SELLERS'; // sellers
const SET_BIDS = 'SET_BIDS'; // bids
const SHOW_VERIFIED_SELLERS = 'SHOW_VERIFIED_SELLERS'
const SELECT_BUYER = 'SELECT_BUYER'
const SHOW_BIDS = 'SHOW_BIDS'

export const state = () => ({
  buyers: [],
  competitions: [],
  sellers: [],
  bids: [],
  showVerifiedSellers: false,
  selectedBuyerId: null,
  selectedCompId: null
})

export const getters = {
  getBuyers: (state) => state.buyers,
  getCompetitions: (state) => {
    if(!state.competitions.length || state.competitions.length == 0) return state.competitions
    if(!state.selectedBuyerId) return [...state.competitions].sort((a,b) => b.minimum_capacity - a.minimum_capacity)    
    return state.competitions.filter(comp => comp.buyer === state.selectedBuyerId)
              .sort((a,b) => b.minimum_capacity - a.minimum_capacity)
  },
  getSellers: (state) => {
    if(!state.showVerifiedSellers) return state.sellers
    if(!state.sellers.length || state.sellers.length == 0) return state.sellers
    return state.sellers.filter(seller => seller.verified)
  },
  getBids: (state) => {
    if(!state.bids.length || state.bids.length == 0) return []
    if(!state.selectedCompId) return []
    return state.bids.filter(bid => bid.competition == state.selectedCompId)
              .sort((a,b) => b.offered_capacity - a.offered_capacity)
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
  }
}

export const mutations = {
  [SET_BUYERS]: (state, buyers) => {
    if(devMode) console.log("Mutation: SET_BUYERS");
    state.buyers = buyers;
  },
  [SET_COMPETITIONS]: (state, competitions) => {
    if(devMode) console.log("Mutation: SET_COMPETITIONS");
    state.competitions = competitions;
  },
  [SET_SELLERS]: (state, sellers) => {
    if(devMode) console.log("Mutation: SET_SELLERS");
    state.sellers = sellers;
  },
  [SET_BIDS]: (state, bids) => {
    if(devMode) console.log("Mutation: SET_BIDS");
    state.bids = bids;
  } ,
  [SHOW_VERIFIED_SELLERS]:  (state, show) => {
    if(devMode) console.log("Mutation: SHOW_VERIFIED_SELLERS"); 
    state.showVerifiedSellers = show;
  },
  [SELECT_BUYER]: (state, buyerId) => {
    if(devMode) console.log("Mutation: SELECT_BUYER"); 
    state.selectedBuyerId = buyerId; 
  },
  [SHOW_BIDS]: (state, compId) => {
    if(devMode) console.log("Mutation: SHOW_BIDS"); 
    state.selectedCompId = compId; 
  }
}

export const actions = {
  setBuyers: (context, buyers) => {
    if(devMode) console.log("Action: setBuyers");
    context.commit(SET_BUYERS, buyers )
  }, 
  setCompetitions: (context, competitions) => {
    if(devMode) console.log("Action: setCompetitions");
    context.commit(SET_COMPETITIONS, competitions )
  }, 
  setSellers: (context, sellers) => {
    if(devMode) console.log("Action: setSellers");
    context.commit(SET_SELLERS, sellers )
  }, 
  setBids: (context, bids) => {
    if(devMode) console.log("Action: setBids");
    context.commit(SET_BIDS, bids )
  },  
  showVerifiedSellers: (context, show) => {
    if(devMode) console.log("Action: showVerifiedSellers");  
    context.commit(SHOW_VERIFIED_SELLERS, show )
  },
  selectBuyer: (context, buyerId) => {
    if(devMode) console.log("Action: selectBuyer"); 
    context.commit(SELECT_BUYER, buyerId )
  },
  showBids: (context, compId) => {
    if(devMode) console.log("Action: showBids"); 
    context.commit(SHOW_BIDS, compId ) 
  }
}