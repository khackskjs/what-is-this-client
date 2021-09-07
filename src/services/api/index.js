import http from '../http'

class ApiService {
  constructor() {}

  async upsertCardGroup(data) {
    const response = await http.post('/card/group', data)

    return response
  }

  getCardList() {
  }

  getCardGroup(guid) {
    guid
  }

}

export default new ApiService()
