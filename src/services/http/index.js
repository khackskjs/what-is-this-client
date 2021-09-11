import axios from 'axios'

const instance = axios.create({
  baseURL: `${process.env.VUE_APP_API_SERVER_URL}`,
})

export default {
  get(url, config) {
    return instance.get(url, config)
  },
  post(url, data, config) {
    return instance.post(url, data, config)
  },
  delete(url, data, config) {
    if (!config) {
      config = {}
    }
    if (data) {
      config = { ...config, data }
    }
    
    return instance.delete(url, config)
  }
}
