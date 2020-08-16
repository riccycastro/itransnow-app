const shortid = require('shortid');

const mutations = {
  SET_NOTIFICATION(state, notification) {
    notification.uid = shortid.generate();
    state.notifications.push(notification);
  },
  SET_NOTIFICATIONS(state, notifications) {
    state.notifications = notifications;
  },
  HANDLE_HTTP_NOTIFICATION_ERROR(state, err) {
    const message = err?.response?.status === 500 ?
      'Internal Server Error, please try again later' :
      (err.response.data.message || 'Unknown error, try again later')

    state.notifications.push({
      uid: shortid.generate(),
      type: 'error',
      message: message,
      fixed: err.response.status === 500
    });
  },
  /**
   * @param state
   * @param {boolean} showSideBar
   * @constructor
   */
  SET_SHOW_SIDE_BAR(state, showSideBar) {
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
