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

  getUserEmail() {
    return user.google.getEmail()
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

  getUser() {
    return user.google
  }
}

/**
 * @type AuthService
 */
const authService = AuthService.instance
export default authService
