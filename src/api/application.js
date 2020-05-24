import api from "./api";

const applicationUrl = api.baseUrl('applications');

export default {
  createApplication(application) {
    return api.post(applicationUrl, application);
  },
  /**
   * @param {string} applicationAlias
   */
  deleteApplication(applicationAlias) {
    return api.delete(applicationUrl + applicationAlias)
  },
  getApplications() {
    return api.get(applicationUrl);
  },
  /**
   * @param {string} applicationAlias
   */
  getApplication(applicationAlias) {
    return api.get(applicationUrl + applicationAlias);
  },
  updateApplication(application) {
    return api.patch(applicationUrl + application.alias, application)
  }
}
