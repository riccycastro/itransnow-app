import api from "./api"

export default {
  getCurrentUserData() {
    return api.get(api.baseUrl('users') + "profile")
  }
}
