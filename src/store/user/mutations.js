export default {
  SET_USER(state, userInfo) {
    state.studyDateCount = userInfo.studyDateCount
    state.name = userInfo.name
    state.uuid = userInfo.uuid
  },
  CLEAR_USER_INFO(state) {
    state.uuid = ''
    state.name = ''
    state.studyDateCount = 0
  }
}
