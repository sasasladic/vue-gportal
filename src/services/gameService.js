import store from "../store/store";

const allGames = function allGames(){
  try {
    // kad bude trebalo
    // return axios.get('game/all', {headers: {Authorization: 'Bearer ' + store.getters.token}});
    return axios.get('game/all');
  }catch (e) {
    throw e;
  }
};

export default {
  allGames
};
