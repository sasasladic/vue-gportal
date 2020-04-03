import games from "./modules/games";
import auth from "./modules/auth/auth";

export default new Vuex.Store({
  state: {
    loading: null
  },
  mutations: {
    loading(state){
      state.loading = !state.loading
    }
  },
  getters: {
    loading(state){
      return state.loading
    }
  },
  modules: {
    games,
    auth
  }
});
