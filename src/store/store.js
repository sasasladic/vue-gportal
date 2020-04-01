import games from "./modules/games";
import auth from "./modules/auth";

export default new Vuex.Store({
  modules: {
    games,
    auth
  }
});
