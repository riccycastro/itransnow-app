'use strict';

import sectionApi from '@/api/section';

export default {
  namespaced: true,
  state: {
    error: null,
    listCount: 0,
    loaded: false,
    sections: [],
  },
  getters: {
    error: (state) => state.error,
    listCount: (state) => state.listCount,
    loaded: (state) => state.loaded,
    sections: (state) => state.sections,
  },
  mutations: {
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
    },
    SET_SECTIONS(state, sections) {
      state.sections = sections.data;
      state.listCount = sections.count;
      state.loaded = true;
    }
  },
  actions: {
    async getApplicationSections({commit, rootGetters}) {
      commit("SET_ERROR", null);
      const currentApplication = rootGetters['application/application'];
      try {
        commit('SET_LOADED', false);
        const res = await sectionApi.getSections(currentApplication.alias);
        commit('SET_SECTIONS', res.data);
      } catch (e) {
        commit("SET_ERROR", e);
        commit('base/HANDLE_HTTP_NOTIFICATION_ERROR', e, {root: true});
      }
    },
    async deleteSection({commit, dispatch, rootGetters}, sectionAlias) {
      commit("SET_ERROR", null);
      const currentApplication = rootGetters['application/application'];
      try {
        commit('SET_LOADED', false);
        await sectionApi.deleteSection(currentApplication.alias, sectionAlias);
        await dispatch('getApplicationSections');
      } catch (e) {
        commit("SET_ERROR", e);
        commit('base/HANDLE_HTTP_NOTIFICATION_ERROR', e, {root: true});
      }
    },
    async updateSection({commit, rootGetters}, {section, sectionAlias}) {
      commit("SET_ERROR", null);
      const currentApplication = rootGetters['application/application'];
      try {
        commit('SET_LOADED', false);
        const res = await sectionApi.editSection(currentApplication.alias, sectionAlias, {name: section.name, isActive: section.isActive});
        return res.data;
      } catch (err) {
        commit("SET_ERROR", err);
        commit('base/HANDLE_HTTP_NOTIFICATION_ERROR', err, {root: true});
      }
    },
    async createSection({commit, dispatch, rootGetters}, section) {
      commit("SET_ERROR", null);
      const currentApplication = rootGetters['application/application'];
      try {
        const sectionCreated = await sectionApi.createSection(currentApplication.alias, section);
        await dispatch('getApplicationSections');
        return sectionCreated.data;
      } catch (err) {
        commit('base/HANDLE_HTTP_NOTIFICATION_ERROR', err, {root: true});
        commit("SET_ERROR", err);
      }
    }
  }
}
