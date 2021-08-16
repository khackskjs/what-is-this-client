import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000',
})

export default {
  get(url, config) {
    return instance.get(url, config)
  },
  post(url, data, config) {
    return instance.post(url, data, config)
  },
}
