const mutations = {
  /**
   * @param state
   * @param {boolean} showSideBar
   * @constructor
   */
  SET_SHOW_SIDE_BAR(state, showSideBar){
    state.showSideBar = showSideBar
  },
  /**
   * @param state
   * @param {string} currentPath
   * @constructor
   */
  UPDATE_CURRENT_PATH (state, currentPath) {
    state.currentPath = currentPath;
  },
  UPDATE_USER_PROFILE (state, user) {
    state.AppActiveUser.uid = user.id
    state.AppActiveUser.displayName = user.name ? user.name : 'Anonymous'
    state.AppActiveUser.about = user.about || ''
    state.AppActiveUser.photoURL = user.img ? user.img : 'avatar-s-11.png'
    state.AppActiveUser.status = user.status ? user.status : 'undefined'
    state.AppActiveUser.userRole =  user.isAdmin ?'admin' : 'undefined'
  },
};

export default mutations;
