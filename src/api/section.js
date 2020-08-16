import api from "./api";

const sectionUrl = api.baseUrl('applications/{applicationAlias}/sections');

export default {
  /**
   * @param {string} applicationAlias
   */
  getSections(applicationAlias) {
    return api.get(api.composedUrl(sectionUrl, {applicationAlias}));
  },
  createSection(applicationAlias, section) {
    return api.post(api.composedUrl(sectionUrl, {applicationAlias}), section);
  },
  /**
   *
   * @param {string} applicationAlias
   * @param {string} sectionAlias
   */
  deleteSection(applicationAlias, sectionAlias) {
    return api.delete(api.composedUrl(`${sectionUrl}{sectionAlias}`, {applicationAlias, sectionAlias}))
  }
};
