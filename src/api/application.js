import api from "./api";

const applicationUrl = api.baseUrl('applications');
export const applicationIncludes = {
  whiteLabels: 'white-labels',
  languages: 'languages',
  sections: 'sections',
}

export default {
  createApplication(application) {
    return api.post(applicationUrl, application);
  },
  /**
   * @param {string} applicationAlias
   */
  deleteApplication(applicationAlias) {
    return api.delete(applicationUrl + applicationAlias);
  },
  getApplications() {
    return api.get(applicationUrl);
  },
  /**
   * @param {string} applicationAlias
   * @param {Object} queryString
   */
  getApplication(applicationAlias, queryString = {}) {
    return api.get(applicationUrl + applicationAlias, queryString);
  },
  updateApplication(application) {
    return api.patch(applicationUrl + application.alias, application);
  },
};
