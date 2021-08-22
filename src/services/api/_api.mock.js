const mock = {
  cardGroupList: [
    createCardGroup('cg1-uid', 'c-group-1'),
    createCardGroup('cg2-uid', 'c-group-2'),
    createCardGroup('cg3-uid', '3 일차'),
    createCardGroup('cg4-uid', '4 일차'),
  ],
  cardList: [
    createCard('cg1-uid', 'c01-uid', 'ENGLISH', '한글'),
    createCard('cg1-uid', 'c02-uid', 'BOY', '소년'),
    createCard('cg1-uid', 'c03-uid', 'GIRL', '소년'),
    createCard('cg2-uid', 'c11-uid', 'Watch', '시계'),
    createCard('cg2-uid', 'c12-uid', 'Game', '오락'),
    createCard('cg2-uid', 'c13-uid', 'Fan', '선풍기'),
    createCard('cg3-uid', 'c21-uid', 'Browser', '브라우저'),
    createCard('cg3-uid', 'c22-uid', 'Monitor', '모니터'),
    createCard('cg3-uid', 'c23-uid', 'Mouse', '쥐'),
    createCard('cg4-uid', 'c31-uid', 'Keyboard', '키보드'),
    createCard('cg4-uid', 'c32-uid', 'ipad', '아이패드'),
    createCard('cg4-uid', 'c33-uid', 'speaker', '스피커'),
  ],
  userInfo: [
    createUserInfo('uuid1', 'khackskjs', 'khackskjs', '마이쏠', 2),
    createUserInfo('uuid2', 'ikostar', 'ikostar', '마이소르', 11),
  ],
}

function createCardGroup(guid, name) {
  return { guid, name }
}
function createCard(guid, cuid, text1, text2) {
  return { guid, cuid, text1, text2, }
}
function createUserInfo(uuid, id, pw, nickname, studyDateCount) {
  return {uuid, id, pw, nickname, studyDateCount }
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
  },
  async getUserInfo({ id, pw }) {
    return wrapServerResponse(mock.userInfo.find(u => u.id === id && u.pw === pw) || {})
  },
}
