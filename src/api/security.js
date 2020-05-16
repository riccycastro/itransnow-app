import axios from "axios"
import api from "./api"

export default {
  login(email, password) {
    return axios.post(api.baseUrl() + 'auth/login', {
      username: email,
      password: password
    })
  }
}
