import VueRouter from 'vue-router';
import Home from '../views/Home';
import Contact from '../views/Contact';
import GamePanel from '../views/GamePanel';
import Order from '../views/Order';
import Forum from '../views/Forum';
import AllGames from '../views/AllGames';
import EmailVerified from "../views/auth/EmailVerified";
import store from "../store/store";
import PasswordReset from "../views/auth/PasswordReset";

let routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/game-panel',
    component: GamePanel,
  },
  {
    path: '/contact-us',
    component: Contact,
  },
  {
    path: '/order',
    component: Order,
    beforeEnter: guard
  },
  {
    path: '/forum',
    component: Forum,
  },
  {
    path: '/game/all',
    component: AllGames,
  },
  {
    path: '/verified',
    component: EmailVerified,
  },
  {
    path: '/password_reset/:token?',
    component: PasswordReset,
  },
  {
    path: '*',
    redirect: '/'
  }
  ];

function guard(to, from, next) {
    if(store.getters.isAuthenticated) {
      return next();
    }else{
      //need to be redirected to login, or to home with notification
      return next('/');
    }
}

export default new VueRouter({
  mode: 'history',
  linkActiveClass: "active-nav",
  linkExactActiveClass: "active-nav",
  routes,
});


