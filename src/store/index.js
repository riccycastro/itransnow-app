import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import baseModule from './base/base'
import securityModule from './security/security'
import userModule from './user/user'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    base: baseModule,
    security: securityModule,
    user: userModule,
    // eCommerce: moduleECommerce
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState({
    paths: ['base', 'security']
  })],
});
