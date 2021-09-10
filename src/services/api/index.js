import http from '../http'

class ApiService {
  constructor() {}

  async upsertCardGroup(data) {
    const response = await http.post('/card/group', data)
    return response
  }

  async upsertCardList(cardList) {
    const response = await http.post('/card/list', { cardList })
    return response
  }

  async getCardGroupList() {
    const response = await http.get('/card/group/list')
    return response
  }

  async getCardList(guid) {
    const params = { guid }
    const response = await http.get('/card/list', { params })
    return response
  }

  getCardGroup(guid) {
    guid
  }

}

export default new ApiService()
