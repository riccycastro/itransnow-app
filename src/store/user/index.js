'use strict';
import userApi from '@/api/user';

export default {
  namespaced: true,
  state: {
    users: [],
  },
  getters: {
    users: state => state.users,
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
  },
  actions: {
    async currentUserData({commit}) {
      try {
        const res = await userApi.getCurrentUserData();
        commit("base/UPDATE_USER_PROFILE", res.data, {root: true});
      } catch (err) {
        commit("security/AUTHENTICATING_ERROR", err, {root: true});
        commit('base/HANDLE_HTTP_NOTIFICATION_ERROR', err, {root: true})
      }
    },
    async getUsers({commit}) {
      try {
        const res = await userApi.getUsers();
        commit('SET_USERS', res.data);
      } catch (err) {
        commit('base/HANDLE_HTTP_NOTIFICATION_ERROR', err, {root: true})
      }
    }
  }
}
