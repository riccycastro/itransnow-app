'use strict';
import securityAPI from "@/api/security"

export default {
  namespaced: true,
  state: {
    error: null,
    token: null,
    isAuthenticated: false,
    roles: []
  },
  getters: {
    hasError(state) {
      return state.error !== null
    },
    error(state) {
      return state.error
    },
    isAuthenticated(state) {
      return !!state.token
    },
    token(state) {
      return state.token
    },
    hasRole(state) {
      return role => {
        return state.roles.indexOf(role) !== -1
      }
    }
  },
  mutations: {
    AUTHENTICATING(state) {
      state.error = null
      state.isAuthenticated = null
      state.roles = []
    },
    AUTHENTICATING_SUCCESS(state, data) {
      state.error = null
      state.isAuthenticated = true
      state.roles = ["USER_ROLE"]
      state.token = data.accessToken
    },
    AUTHENTICATING_ERROR(state, error) {
      state.error = error
      state.isAuthenticated = false
      state.roles = []
    },
    AUTHENTICATION_RESET(state) {
      state.error = null
      state.token = null
      state.isAuthenticated = false
      state.roles = []
    }
  },
  actions: {
    async login({commit}, payload) {
      commit('AUTHENTICATING')

      try {
        const result = await securityAPI.login(payload.email, payload.password);
        commit('AUTHENTICATING_SUCCESS', result.data);
        commit('base/SET_NOTIFICATIONS', []);
      } catch (err) {
        commit('AUTHENTICATING_ERROR', err)
      }
    },
    authenticationReset({commit}) {
      commit('AUTHENTICATION_RESET')
    }
  }
}
