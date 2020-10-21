import api from "./api";

const sectionBaseUrl = api.baseUrl('applications/{applicationAlias}/sections');
const sectionUrl = `${sectionBaseUrl}{sectionAlias}`;
export default {
  /**
   * @param {string} applicationAlias
   */
  getSections(applicationAlias) {
    return api.get(api.composedUrl(sectionBaseUrl, {applicationAlias}));
  },
  createSection(applicationAlias, section) {
    return api.post(api.composedUrl(sectionBaseUrl, {applicationAlias}), section);
  },
  /**
   *
   * @param {string} applicationAlias
   * @param {string} sectionAlias
   */
  deleteSection(applicationAlias, sectionAlias) {
    return api.delete(api.composedUrl(sectionUrl, {applicationAlias, sectionAlias}));
  },
  /**
   *
   * @param {string} applicationAlias
   * @param {string} sectionAlias
   * @param {Object} section
   */
  editSection(applicationAlias, sectionAlias, section) {
    return api.patch(api.composedUrl(sectionUrl, {applicationAlias, sectionAlias}), section);
  }
};
