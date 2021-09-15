export default {
  SET_USER(state, userInfo) {
    state.studyDateCount = userInfo.studyDateCount
    state.name = userInfo.name
    state.uuid = userInfo.uuid
  },
}
