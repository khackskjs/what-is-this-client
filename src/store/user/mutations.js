export default {
  SET_USER(state, userInfo) {
    state.studyDateCount = userInfo.studyDateCount
    state.nickname = userInfo.nickname
    state.uuid = userInfo.uuid
  },
}
