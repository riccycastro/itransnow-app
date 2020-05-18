import Vue from "vue";
import DropDown from "./components/Dropdown.vue";

/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */
const GlobalComponents = {
  install(Vue) {
    Vue.component("drop-down", DropDown);
  }
};

import * as VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";
Vue.use(MaterialDashboard);

// import VueMaterial from 'vue-material'
// import 'vue-material/dist/vue-material.min.css'
// Vue.use(VueMaterial)

// Vuesax plugin
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
Vue.use(Vuesax, {
  theme: {
    colors:{
      primary:'#ff9800',
      success:'#4caf50',
      danger:'#f44336',
      warning:'#ef6c00',
      dark:'rgb(36, 33, 69)'
    }
  }
});

import '@/assets/css/tailwind.css'

export default GlobalComponents;
