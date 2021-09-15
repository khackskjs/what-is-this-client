// import apiService from '../../services/api/_api.mock'
import apiServiceReal from '@services/api'

export default {
  async loginUser({ commit }, { email, name }) {
    const response = await apiServiceReal.upsertUserInfo({ email, name })
    if (response.status === 200) {
      commit('SET_USER', response.data)
    }
    return response.data
  },
}
