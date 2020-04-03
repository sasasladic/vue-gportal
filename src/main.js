import './assets/js/bootstrap';
import './core/bootstrap';
import router from './core/routes';
import store from "./store/store";
import App from './App.vue';

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
