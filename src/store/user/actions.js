import apiService from '../../services/api/_api.mock'

export default {
  async getUserInfo({ commit }, { id, pw }) {
    const response = await apiService.getUserInfo({ id, pw })
    if (response.status === 200) {
      const { studyDateCount, nickname, uuid } = response.data
      commit('SET_STUDY_DATE_COUNT', studyDateCount || 1)
      commit('SET_NICKNAME', nickname || '')
      commit('SET_UUID', uuid)
    }
  },
}
