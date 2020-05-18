'use strict';
import userApi from '@/api/user';

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async currentUserData({commit}) {
      try {
        const res = await userApi.getCurrentUserData();
        commit("base/UPDATE_USER_PROFILE", res.data, {root: true});
      } catch (err) {
        commit("security/AUTHENTICATING_ERROR", err, {root: true});
      }
    }
  }
}
