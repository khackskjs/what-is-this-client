import http from '@/services/http'
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
    this._setHttpIntercepters()
  }

  isAuthenticated() {
    console.log('isAuthenticated', user.google)
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

  _setHttpIntercepters() {
    http.setInterceptors({
      request: [
        (config) => {
          config.headers.Authorization = `Bearer ${this.getUserIdToken()}`
          return config
        },
        (error) => Promise.reject(error)
      ]
    })
  }
}

/**
 * @type AuthService
 */
const authService = AuthService.instance
export default authService
