import apiService from '@services/api/_api.mock'
import apiServiceReal from '@services/api'

export default {
  async saveCardGroup({  }, cardGroup) {
    const response = await apiServiceReal.upsertCardGroup(cardGroup)
    if (response.status === 200) {
      return response.data
    }
  },
  async saveCardList({}, cardList) {
    console.log('cardList', cardList)
    const response = await apiServiceReal.upsertCardList(cardList)
    if (response.status === 200) {
      return response.data
    }
  },
  async getCardGroupList({ commit }) {
    const response = await apiServiceReal.getCardGroupList()
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
