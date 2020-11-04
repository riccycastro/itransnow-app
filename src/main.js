import Vue from 'vue';
import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify';
import * as VeeValidate from 'vee-validate';

import router from "./router";
import './filters';

import 'material-icons';
import './assets/tailwindcss/tailwind.css';

Vue.config.productionTip = false;

Vue.use(VeeValidate);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
