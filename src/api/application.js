import api from "./api";

const applicationUrl = 'applications';

export default {
  getApplications() {
    return api.get(`${api.baseUrl(applicationUrl)}`);
  },
  /**
   * @param {string} applicationAlias
   */
  getApplication(applicationAlias) {
    return api.get(`${api.baseUrl(applicationUrl)}/${applicationAlias}`);
  }
}
