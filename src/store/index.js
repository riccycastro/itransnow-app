import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import base from './base'
import security from './security'
import user from './user'
import application from './application'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    base,
    security,
    user,
    application,
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState({
    paths: ['base', 'security']
  })],
});
