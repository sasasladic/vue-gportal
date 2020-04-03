import Vue from'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import axios from 'axios';
import variables from './variables';
import Notifications from 'vue-notification';
import Form from '../utilities/Form.js';
import {notification} from '../helpers/notification.js';

window.Notifications = Notifications;
window.Vue = Vue;
window.axios = axios;
window.Vuex = Vuex;
window.Form = Form;

Vue.use(Notifications);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.prototype.$notification = notification;

axios.defaults.baseURL = variables.API_URL;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.get['Accept'] = 'application/json';

