export default {
  selectedCardGroupUuid(state) {
    console.log('root getter', state)
    return state.selectedCardGroupUuid
  },
  selectedCardList(state) {
    return state.card.cardListMap[state.selectedCardGroupUuid]
  },
}
