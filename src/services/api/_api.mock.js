const mock = {
  cardGroupList: [
    createCardGroup('cg1-uid', 'c-group-1'),
    createCardGroup('cg2-uid', 'c-group-2'),
  ],
  cardList: [
    createCard('cg1-uid', 'c01-uid', 'ENGLISH', '한글'),
    createCard('cg1-uid', 'c02-uid', 'BOY', '소년'),
    createCard('cg1-uid', 'c03-uid', 'GIRL', '소년'),
    createCard('cg2-uid', 'c11-uid', 'Watch', '시계'),
    createCard('cg2-uid', 'c12-uid', 'Game', '오락'),
    createCard('cg2-uid', 'c13-uid', 'Fan', '선풍기'),
  ],
}
function createCardGroup(guid, name) {
  return { name, }
}
function createCard(guid, cuid, text1, text2) {
  return { guid, cuid, text1, text2, }
}

function wrapServerResponse(args) {
  return ({ status: 200, data: args })
}

export default {
  async getCardGroupList() {
    return wrapServerResponse(mock.cardGroupList)
  },
  async getCardList({ guid }) {
    return wrapServerResponse(mock.cardList.filter(c => c.guid === guid))
  }
}
