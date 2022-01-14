import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from "./router/router";
import Vuelidate from 'vuelidate'
import axios from 'axios';
import './plugins';
import store from './store';
import './mixins';
import './assets/fontawesome/css/all.css';


Vue.config.productionTip = false

new Vue({
  vuetify,
  Vuex,
  router,
  Vuelidate,
  axios,
  store,
  render: h => h(App)
}).$mount('#app')
