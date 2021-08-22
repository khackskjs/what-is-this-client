import apiService from '../../services/api/_api.mock'

export default {
  async getCardGroupList({ commit }) {
    const response = await apiService.getCardGroupList()
    if (response.status === 200) {
      commit('SET_GROUP_LIST', response.data)
    }

  },
  async getCardList({ commit }, guid) {
    const response = await apiService.getCardList({ guid })
    if (response.status === 200) {
      commit('SET_CARD_LIST', { guid, cardList: response.data })
    }
  },
}