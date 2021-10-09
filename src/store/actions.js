export default {
  async selectCardGroupUuid({ commit }, guid) {
    commit('SELECT_CARD_GROUP_UUID', guid)
    commit('SELECT_CARD_GROUP', guid)
  },
  async setDeviceOrientation({ commit }, orientation) {
    commit('SET_DEVICE_ORIENTATION', orientation)
  },
  async setInnerWidthHieght({ commit }, {width, height}) {
    commit('SET_INNER_WIDTH_HEIGHT', {width, height})
  }
}