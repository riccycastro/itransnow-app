import api from "./api";

const applicationUrl = api.baseUrl('applications');

export default {
  getApplications() {
    return api.get(applicationUrl);
  },
  /**
   * @param {string} applicationAlias
   */
  getApplication(applicationAlias) {
    return api.get(applicationUrl + applicationAlias);
  },
  /**
   * @param {string} applicationAlias
   */
  deleteApplication(applicationAlias) {
    return api.delete(applicationUrl + applicationAlias)
  }
}
