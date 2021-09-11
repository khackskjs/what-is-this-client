export default {
  SET_GROUP_LIST(state, list) {
    state.cardGroupList = list
  },
  SET_CARD_LIST(state, { guid, cardList }) {
    state.cardListMap[guid] = cardList
  },
  DELETE_CARD_GROUP(state, guid) {
    const index = state.cardGroupList.findIndex(g => g.guid === guid)
    if (index !== -1) {
      state.cardGroupList.splice(index, 1)
    }
  },
}
