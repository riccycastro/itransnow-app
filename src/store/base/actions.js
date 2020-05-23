const actions = {
  /**
   * @param commit
   * @param {boolean} showSideBar
   */
  setShowSideBar({commit}, showSideBar) {
    console.log(showSideBar)
    commit('SET_SHOW_SIDE_BAR', showSideBar);
  }
};

export default actions;
