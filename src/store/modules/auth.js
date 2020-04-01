import router from "../../core/routes";
import Vue from 'vue';

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
  }
};

const actions = {
  setLogoutTimer: ({commit}, expirationTime) =>{
    const now = new Date();
    setTimeout(() => {
      commit('clearAuthData')
    },expirationTime.getTime() - now.getTime())
  //  expirationTime take one hour in milliseconds
  },
  verifyEmail: ({commit}, userData) => {
    axios.get('/email/resend',{headers: {Authorization: 'Bearer ' + userData.token}})
      .then(res => {
      //develop debug
      console.log(res);
        Vue.notify({
          group: 'main',
          title: 'Registration',
          type: "success",
          text: 'You have successfully registered! Please confirm you email to continue.',
          duration: 3000,
          speed: 1000
        });
    });
  },
  register: ({commit, dispatch}, authData) => {
    let form = new Form({
        first_name: authData.first_name,
        last_name: authData.last_name,
        username: authData.username,
        email: authData.email,
        password: authData.password,
        password_confirmation: authData.password_confirmation,
        country: authData.country
    });

    // axios.post('/register', {
    //   first_name: authData.first_name,
    //   last_name: authData.last_name,
    //   username: authData.username,
    //   email: authData.email,
    //   password: authData.password,
    //   password_confirmation: authData.password_confirmation,
    //   country: authData.country
  // }
    form.post('register'
    ).then(res => {
      //develop debug
      console.log(res.user);

      //from seconds to milliseconds
      // const expirationDate = new Date(res.expiration * 1000);
      // setLocalStorage(res.token, res.user, expirationDate);

      //set user, token in vuex-store and logout when token expire
      // commit('authUser', {token: res.token, user: res.user});
      dispatch('verifyEmail', {token: res.token, userId: res.user.id});
      // dispatch('setLogoutTimer', expirationDate);
    }).catch(() => {
      console.log(form.errors.any());
      Vue.notify({
        group: 'main',
        title: 'Registration',
        type: 'error',
        text: form.errors.get('message'),
        duration: 3000,
        speed: 1000
      });
    });
  },
  login: ({commit, dispatch}, authData) => {
    axios.post('login', {
      email: authData.email,
      password: authData.password
    }).then(res => {
      //develop debug
      console.log(res.data.user);
      if(!res.data.user.email_verified_at){
        Vue.notify({
          group: 'main',
          title: 'Login',
          type: "error",
          text: 'You need to verify you email!',
          duration: 3000,
          speed: 1000
        });
        return;
      }

      //from seconds to milliseconds
      const expirationDate = new Date(res.data.expiration * 1000);
      setLocalStorage(res.data.token, res.data.user, expirationDate);

      Vue.notify({
        group: 'main',
        title: 'Login',
        type: "success",
        text: 'You have successfully logged in!',
        duration: 3000,
        speed: 1000
      });

      //set user, token in vuex-store and logout when token expire
      commit('authUser', {token: res.data.token, user: res.data.user});
      dispatch('setLogoutTimer', expirationDate);

    }).catch((error) => {
        Vue.notify({
          group: 'main',
          title: 'Login',
          type: 'error',
          text: error.response.data.message,
          duration: 3000,
          speed: 1000
        });
      });
  },
  tryAutoLogin: ({commit}) => {
    const token = localStorage.getItem('token');
    if (!token || token === 'undefined'){
      return;
    }
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    const now = new Date();
    if(now.getTime() >= expirationDate.getTime()) {
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
    // router.replace('/');
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
  }
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
