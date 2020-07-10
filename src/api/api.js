import store from '../store'
import axios from 'axios'

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
  }

  static delete(url, headers = {}) {
    const headerObject = this.getSecurityToken(headers)
    return axios.delete(url, headerObject)
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
}
