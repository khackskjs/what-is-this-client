export default {
  async selectCardGroupUuid({ commit }, guid) {
    commit('SELECT_CARD_GROUP_UUID', guid)
    commit('SELECT_CARD_GROUP', guid)
  },
}