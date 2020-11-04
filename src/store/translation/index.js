'use strict';

import translationApi from '@/api/translation';

export default {
  namespaced: true,
  state: {
    error: null,
    listCount: 0,
    loaded: false,
    translations: [],
  },
  getters: {
    error: (state) => state.error,
    listCount: (state) => state.listCount,
    loaded: state => state.loaded,
    translations: state => state.translations,
  },
  mutations: {
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_LOADED(state, loaded) {
      state.loaded = loaded;
    },
    SET_TRANSLATIONS(state, translations) {
      state.translations = translations.data;
      state.listCount = translations.count;
      state.loaded = true;
    }
  },
  actions: {
    async getApplicationTranslations({commit, rootGetters}, {query, languageCode}) {
      commit("SET_ERROR", null);
      const currentApplication = rootGetters['application/application'];

      try {
        commit('SET_LOADED', false);
        const result = await translationApi.getApplicationTranslations(
          currentApplication.alias,
          languageCode,
          query
        );
        commit('SET_TRANSLATIONS', result.data);
      } catch (err) {
        commit('base/HANDLE_HTTP_NOTIFICATION_ERROR', err, {root: true});
        commit("SET_ERROR", err);
      }
    }
  }
}
