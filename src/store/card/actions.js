import apiService from '@/services/api'

export default {
  async saveCardGroup({}, cardGroup) {
    const response = await apiService.upsertCardGroup(cardGroup)
    if (response.status === 200) {
      return response.data
    }
  },
  async saveCardList({}, cardList) {
    console.log('cardList', cardList)
    const response = await apiService.upsertCardList(cardList)
    if (response.status === 200) {
      return response.data
    }
  },
  async getCardGroupList({ commit }) {
    const response = await apiService.getCardGroupList()
    if (response.status === 200) {
      commit('SET_GROUP_LIST', response.data)
    }
  },
  async getCardList({ commit }, guid) {
    const response = await apiService.getCardList(guid)
    if (response.status === 200) {
      commit('SET_CARD_LIST', { guid, cardList: response.data })
    }
  },
  async deleteCardGroup({ commit }, guid) {
    const response = await apiService.deleteCardGroup(guid)
    if (response.status === 200) {
      commit('DELETE_CARD_GROUP', guid)
    }
  },
  async getReviewCards({ commit }, dateOfReview) {
    const response = await apiService.selectReviewCardList(dateOfReview)
    if (response.status === 200) {
      commit('SET_REVIEW_CARD_LIST', response.data)
    }
  },
  async reviewCard({}, card) {
    const response = await apiService.reviewCard(card)
    if (response.status !== 200) {
      alert('Can not update card')
    }
  },
}
