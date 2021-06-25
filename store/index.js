let devMode = process.env.NODE_ENV === 'development';
const SET_BUYERS = 'SET_BUYERS';
const SET_COMPETITIONS = 'SET_COMPETITIONS'; //competitions
const SET_SELLERS = 'SET_SELLERS'; // sellers
const SET_BIDS = 'SET_BIDS'; // bids

export const state = () => ({
  buyers: [],
  competitions: [],
  sellers: [],
  bids: []    
})

export const getters = {
  getBuyers: (state) => state.buyers,
  getCompetitions: (state) => state.competitions,
  getSellers: (state) => state.sellers,
  getBids: (state) => state.bids,
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
}