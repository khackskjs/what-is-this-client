export default {
  SELECT_CARD_GROUP_UUID(state, guid) {
    state.selectedCardGroupUuid = guid
  },
  SELECT_CARD_GROUP(state, guid) {
    state.selectedCardGroup = state.card.cardGroupList.find(cg => cg.guid === guid)
  },
  SET_DEVICE_ORIENTATION(state, orientation) {
    state.deviceOrientation = orientation
  },
  SET_INNER_WIDTH_HEIGHT(state, {width, height}) {
    state.deviceInnerHeight = height
    state.deviceInnerWidth = width
  }
}