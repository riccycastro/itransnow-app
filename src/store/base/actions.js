const actions = {
  setNotification({commit}, notification) {
    commit('SET_NOTIFICATION', notification);
  },
  setNotifications({commit}, notifications) {
    commit('SET_NOTIFICATIONS', notifications);
  },
  /**
   * @param commit
   * @param {boolean} showSideBar
   */
  setShowSideBar({commit}, showSideBar) {
    commit('SET_SHOW_SIDE_BAR', showSideBar);
  }
};

export default actions;
