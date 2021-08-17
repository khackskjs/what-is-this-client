export default {
  SET_GROUP_LIST(state, list) {
    state.cardGroupList = list
  },
  SET_CARD_LIST(state, { guid, cardList }) {
    state.cardListMap[guid] = cardList
  },
}
