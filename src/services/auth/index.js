const user = {}
const singleton = Symbol()
const singletonEnforcer = Symbol()

class AuthService {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton')
    }
  }

  setGoogleUser(userInfo) {
    user.google = userInfo
  }

  isAuthenticated() {
    return !!user.google
  }

  getUserIdToken() {
    return user.google.getAuthResponse().id_token
  }

  getUserEmail() {
    return user.google.getBasicProfile().getEmail()
  }

  getUserName() {
    return user.google.getBasicProfile().getName()
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new AuthService(singletonEnforcer)
    }
    return this[singleton]
  }

  async logout() {
    const authInstance = window.gapi.auth2.getAuthInstance()
    await authInstance.signOut()
  }

  getUserInfo() {
    return { email: this.getUserEmail(), name: this.getUserName() }
  }
}

/**
 * @type AuthService
 */
const authService = AuthService.instance
export default authService
