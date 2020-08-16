import store from '../store'
import axios from 'axios'
import router from '../router'

export default class api {
  static protocol() {
    return "http://"
  }

  static baseUrl(suffix = '') {
    return this.protocol() + "api.itransnow.local/" + (suffix ? suffix + '/' : '')
  }

  /**
   *
   * @param {object} headers
   */
  static getSecurityToken(headers) {
    if (store.state.security.token) {
      headers.Authorization = "Bearer " + store.state.security.token
    }
    return {headers: headers}
  }

  /**
   *
   * @param {string} url
   * @param {object} queryString
   * @param {object} headers
   * @returns {Promise<any>}
   */
  static get(url, queryString = {}, headers = {}) {
    const headerObject = this.getSecurityToken(headers)

    return axios.get(url + '?' + this.serializeToQueryString(queryString), headerObject)
      .catch(this.handleError)
  }

  /**
   *
   * @param {string} url
   * @param {object} data
   * @param {object} headers
   * @returns {Promise<any>}
   */
  static post(url, data, headers = {}) {
    const headerObject = this.getSecurityToken(headers)
    return axios.post(url, data, headerObject)
      .catch(this.handleError)
  }

  /**
   *
   * @param {string} url
   * @param {object} data
   * @param {object} headers
   * @returns {Promise<any>}
   */
  static patch(url, data, headers = {}) {
    const headerObject = this.getSecurityToken(headers)
    return axios.patch(url, data, headerObject)
      .catch(this.handleError)
  }

  static delete(url, headers = {}) {
    const headerObject = this.getSecurityToken(headers)
    return axios.delete(url, headerObject)
      .catch(this.handleError)
  }

  /**
   * @param e
   */
  static handleError(e) {
    if (e.response.status === 401 && e.response?.data?.redirectTo) {
      router.push(e.response.data.redirectTo)
      return;
    }

    store.commit('base/HANDLE_HTTP_NOTIFICATION_ERROR', e, {root: true})

    throw e;
  }

  /**
   *
   * @param obj
   * @returns {string}
   */
  static serializeToQueryString(obj) {
    const str = []

    for (const key of Object.keys(obj)) {
      str.push(`${key}=${obj[key]}`)
    }

    return str.join('&')
  }

  static composedUrl(url, params) {
    for (const key of Object.keys(params)) {
      url = url.replace(`{${key}}`, params[key])
    }

    return url;
  }
}
