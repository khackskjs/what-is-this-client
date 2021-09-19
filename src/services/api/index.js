import http from '../http'

const REVIEW = {
  NONE: 0,
  SUCCESS: 1,
  FAILURE: 2,
}

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

  async deleteCardGroup(guid) {
    const response = await http.delete('/card/group', { guid })
    return response
  }

  async upsertUserInfo({ email, name }) {
    const response = await http.post('/user', { email, name })
    return response
  }

  async selectReviewCardList(dateOfReview) {
    const params = { dateOfReview }
    const response = await http.get('/card/review/list', { params })
    return response
  }

  async reviewCard({ cuid, lastReviewResult, dateOfReview }) {
    const response = await http.post('/card/review', { cuid, lastReviewResult, dateOfReview })
    return response
  }
}

export default new ApiService()
export { REVIEW }
