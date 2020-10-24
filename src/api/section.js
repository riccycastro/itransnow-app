import api from "./api";

const sectionBaseUrl = api.baseUrl('applications/{applicationAlias}/sections');
const sectionUrl = `${sectionBaseUrl}{sectionAlias}`;
export default {
  /**
   * @param {string} applicationAlias
   * @returns {Promise<*>}
   */
  getSections(applicationAlias) {
    return api.get(api.composedUrl(sectionBaseUrl, {applicationAlias}));
  },
  /**
   * @param {string} applicationAlias
   * @param {object} section
   * @returns {Promise<*>}
   */
  createSection(applicationAlias, section) {
    return api.post(api.composedUrl(sectionBaseUrl, {applicationAlias}), section);
  },
  /**
   * @param {string} applicationAlias
   * @param {string} sectionAlias
   * @returns {Promise<*>}
   */
  deleteSection(applicationAlias, sectionAlias) {
    return api.delete(api.composedUrl(sectionUrl, {applicationAlias, sectionAlias}));
  },
  /**
   * @param {string} applicationAlias
   * @param {string} sectionAlias
   * @param {Object} section
   * @returns {Promise<*>}
   */
  editSection(applicationAlias, sectionAlias, section) {
    return api.patch(api.composedUrl(sectionUrl, {applicationAlias, sectionAlias}), section);
  }
};
