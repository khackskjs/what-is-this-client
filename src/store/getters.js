export default {
  selectedCardGroupUuid(state) {
    return state.selectedCardGroupUuid
  },
  selectedCardGroup(state) {
    return !state.selectedCardGroupUuid ? {}
      : state.card.cardGroupList.find(g => g.guid === state.selectedCardGroupUuid)
  },
  selectedCardList(state) {
    return state.card.cardListMap[state.selectedCardGroupUuid]
  },
  deviceInnerWidth(state) {
    return state.deviceInnerWidth
  },
  deviceInnerHeight(state) {
    return state.deviceInnerHeight
  },
}
