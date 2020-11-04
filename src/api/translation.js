/** */
import api from "./api";

const translationBaseUrl = api.baseUrl('applications/{applicationAlias}/translations/{languageCode}');

export default {
  getApplicationTranslations(applicationAlias, languageCode, queryString = {}) {
    return api.get(api.composedUrl(translationBaseUrl, {applicationAlias, languageCode}), queryString)
  }
};
