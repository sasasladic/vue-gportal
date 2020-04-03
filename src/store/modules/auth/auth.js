import router from "../../../core/routes";
import {notification} from "../../../helpers/notification";

const state = {
  token: null,
  user: null
};

const mutations = {
  authUser: (state, userData) => {
    state.token = userData.token;
    state.user = userData.user;
  },
  clearAuthData: (state) => {
    state.token = null;
    state.user = null;
  },
};

const actions = {
  setLogoutTimer: ({commit}, expirationTime) => {
    const now = new Date();
    setTimeout(() => {
      commit('clearAuthData')
    }, expirationTime.getTime() - now.getTime())
    //  expirationTime take one hour in milliseconds
  },
  verifyEmail: ({commit}, userData) => {
    axios.get('/email/resend', {headers: {Authorization: 'Bearer ' + userData.token}})
      .then(res => {
        commit('loading');
        //develop debug
        console.log(res);
        let content = {
          title: 'Registration',
          type: "success",
          text: 'You have successfully registered! Please confirm you email to continue.'
        };
        notification.showNotification({content});
      });
  },
  register: ({commit, dispatch}, authData) => {
    commit('loading');
    let form = new Form(authData);
    form.post('register').then(res => {
        //develop debug
        console.log(res.user);

        dispatch('verifyEmail', {token: res.token, userId: res.user.id});
      }).catch(error => {
      commit('loading');
        //develop debug
      console.log(error.message);

      let content = {
        title: 'Registration',
        type: 'error'
      };
      notification.showNotification({content} , {error: error.errors});
    });
  },
  login: ({commit, dispatch}, authData) => {
    commit('loading');
    if(localStorage.getItem('reset_email')){
      localStorage.removeItem('reset_email');
    }

    let content = {
      title: 'Login'
    };

    let form = new Form(authData);
    form.post('login').then(res => {
      //from seconds to milliseconds
      const expirationDate = new Date(res.expiration * 1000);
      setLocalStorage(res.token, res.user, expirationDate);

      content.type = 'success';
      content.text = 'You have successfully logged in!';
      notification.showNotification({content});

      //set user, token in vuex-store and logout when token expire
      commit('authUser', {token: res.token, user: res.user});
      dispatch('setLogoutTimer', expirationDate);

      commit('loading');
    }).catch(error => {
      commit('loading');
      content.type = 'error';
      notification.showNotification({content} , {error: error.errors});
    });
  },
  tryAutoLogin: ({commit}) => {
    const token = localStorage.getItem('token');
    if (!token || token === 'undefined') {
      return;
    }
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    const now = new Date();
    if (now.getTime() >= expirationDate.getTime()) {
      return;
    }
    const user = localStorage.getItem('user');
    commit('authUser', {
      token: token,
      user: JSON.parse(user)
    });
  },
  logout: ({commit}) => {
    commit('clearAuthData');
    //localStorage.setItem('expirationDate', new Date()); - also option
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('expirationDate');

    let content = {
      title: 'Logout',
      type: 'primary',
      text: 'You have successfully logged out!',
    };

    notification.showNotification({content});
    if( window.location.pathname !== '/') {
      router.push({ name: "home"});
    }
  }
};

const getters = {
  user: (state) => {
    return state.user;
  },
  isAuthenticated: (state) => {
    return state.token !== null;
  },
  token: (state) => {
    return state.token;
  },
};

function setLocalStorage(token, user, expirationDate) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('expirationDate', expirationDate);
}

export default {
  state,
  mutations,
  actions,
  getters
}
