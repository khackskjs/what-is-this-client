import apiService from '../../services/api/_api.mock'

export default {
  async getCardGroupList() {
    apiService.getCardGroupList()
  },
  getCardList(guid) {
    guid
  },
}