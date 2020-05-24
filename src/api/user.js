import api from "./api"

const userUrl = api.baseUrl('users');

export default {
  getCurrentUserData() {
    return api.get(userUrl + "profile");
  },
  getUsers() {
    return api.get(userUrl);
  }
}
