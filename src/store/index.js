import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import base from './base'
import security from './security'
import user from './user'
import application from './application'
import section from './section'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    application,
    base,
    section,
    security,
    user,
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState({
    paths: ['base', 'security']
  })],
});
