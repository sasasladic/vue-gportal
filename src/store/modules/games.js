import gameService from "../../services/gameService";

const state = {
  games: []
};

const mutations = {
  setGames: (state, games) => {
    state.games = games;
  },

};

const actions = {
  initGames: ({commit}) => {
    gameService.allGames().then(res => {
      commit('setGames',res.data.data)
    }).catch(error => {
      console.log(error);
    })
  },

};

const getters = {
  allGames: state => {
    return state.games;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
