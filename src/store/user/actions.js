// import apiService from '../../services/api/_api.mock'
import apiServiceReal from '@services/api'

export default {
  async loginUser({ commit }, { email, name }) {
    const response = await apiServiceReal.upsertUserInfo({ email, name })
      .catch(err => err.response)
    
    if (response.status === 200) {
      commit('SET_USER', response.data)
    } else {
      response.data = null
    }
    return response.data
  },
}
