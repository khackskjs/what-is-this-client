export default {
  async selectCardGroupUuid({ commit }, guid) {
    commit('SELECT_CARD_GROUP_UUID', guid)
  },
  async selectCardList({ commit }, list) {
    commit('SELECT_CARD_LIST', list)
  },
}