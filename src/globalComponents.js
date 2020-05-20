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

import 'material-icons/iconfont/material-icons.scss';

import Loading from 'vue-loading-overlay';
Vue.use(Loading)

import '@/assets/css/tailwind.css'

export default GlobalComponents;
