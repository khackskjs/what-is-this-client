export default {
  selectedCardGroupUuid(state) {
    console.log('root getter', state)
    return state.selectedCardGroupUuid
  },
  selectedCardGroup(state) {
    return !state.selectedCardGroupUuid ? {}
      : state.card.cardGroupList.find(g => g.guid === state.selectedCardGroupUuid)
  },
  selectedCardList(state) {
    return state.card.cardListMap[state.selectedCardGroupUuid]
  },
}
