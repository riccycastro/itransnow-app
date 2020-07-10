'use strict';
import applicationApi from '@/api/application'

export default {
  namespaced: true,
  state: {
    application: null,
    applications: [],
    error: null,
    listCount: 0,
    loaded: false,
  },
  getters: {
    application(state) {
      return state.application;
    },
    applications(state) {
      return state.applications;
    },
    error(state) {
      return state.error;
    },
    hasError(state) {
      return state.error !== null;
    },
    listCount(state) {
      return state.listCount;
    },
    loaded(state) {
      return state.loaded;
    },
  },
  mutations: {
    ADD_APPLICATION(state, applicaption) {
      state.applications.push(applicaption);
    },
    SET_APPLICATION(state, application) {
      state.application = application;
    },
    SET_APPLICATIONS(state, applications) {
      state.applications = applications.data;
      state.listCount = applications.count;
      state.loaded = true;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    /**
     * @param state
     * @param {boolean} loaded
     * @constructor
     */
    SET_LOADED(state, loaded) {
      state.loaded = loaded;
    }
  },
  actions: {
    async createApplication({commit, dispatch}, application) {
      try {
        const applicationCreated = await applicationApi.createApplication(application);
        await dispatch('getApplications');
        return applicationCreated.data;
      } catch (err) {
        commit('base/HANDLE_HTTP_NOTIFICATION_ERROR', err, {root: true})
        commit("SET_ERROR", err)
      }
    },
    async deleteApplication({commit, dispatch}, applicationAlias) {
      commit("SET_ERROR", null)
      try {
        await applicationApi.deleteApplication(applicationAlias);
        await dispatch('getApplications');
      } catch (err) {
        commit('base/HANDLE_HTTP_NOTIFICATION_ERROR', err, {root: true})
        commit("SET_ERROR", err)
      }
    },
    /**
     * @param commit
     * @param {string} applicationAlias
     * @returns {Promise<void>}
     */
    async getApplication({commit}, applicationAlias) {
      commit("SET_ERROR", null)
      try {
        const res = await applicationApi.getApplication(applicationAlias)
        commit('SET_APPLICATION', res.data)
      } catch (err) {
        commit("SET_ERROR", err)
      }
    },
    setApplication({commit}, application) {
      commit('SET_APPLICATION', application)
    },
    async getApplications({commit}) {
      commit("SET_ERROR", null)
      try {
        commit('SET_LOADED', false);
        const res = await applicationApi.getApplications();
        commit('SET_APPLICATIONS', res.data)
      } catch (err) {
        commit("SET_ERROR", err)
      }
    },
    /**
     * @param commit
     * @param {Object} application
     * @param {string}applicationAlias
     */
    async updateApplication({commit}, application) {
      commit("SET_ERROR", null)
      try {
        const res = await applicationApi.updateApplication(application);
        return res.data;
      } catch (err) {
        commit("SET_ERROR", err)
        commit('base/HANDLE_HTTP_NOTIFICATION_ERROR', err, {root: true})
      }
    }
  }
}
