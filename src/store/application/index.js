'use strict';
import applicationApi from '@/api/application'

export default {
  namespaced: true,
  state: {
    applications: [],
    listCount: 0,
    application: null,
    error: null
  },
  getters: {
    applications(state) {
      return state.applications;
    },
    listCount(state) {
      return state.listCount;
    },
    application(state) {
      return state.application;
    },
    hasError(state) {
      return state.error !== null;
    },
    error(state) {
      return state.error;
    }
  },
  mutations: {
    SET_APPLICATIONS(state, applications) {
      state.applications = applications.data;
      state.listCount = applications.count;
    },
    SET_APPLICATION(state, application) {
      state.application = application;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },
  actions: {
    async getApplications({commit}) {
      try {
        const res = await applicationApi.getApplications();
        commit('SET_APPLICATIONS', res.data)
      } catch (err) {
        commit("SET_ERROR", err)
      }
    },
    /**
     * @param commit
     * @param {string} applicationAlias
     * @returns {Promise<void>}
     */
    async getApplication({commit}, applicationAlias) {
      try {
        const res = await applicationApi.getApplication(applicationAlias)
        commit('SET_APPLICATION', res.data)
      } catch (err) {
        commit("SET_ERROR", err)
      }
    }
  }
}
