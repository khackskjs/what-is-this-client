export default {
  SELECT_CARD_GROUP_UUID(state, guid) {
    state.selectedCardGroupUuid = guid
  },
  SELECT_CARD_GROUP(state, guid) {
    state.selectedCardGroup = state.card.cardGroupList.find(cg => cg.guid === guid)
  }
}