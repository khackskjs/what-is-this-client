const user = {}
const singleton = Symbol()
const singletonEnforcer = Symbol()

export class AuthService {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton')
    }
  }

  setGoogleUser(userInfo) {
    user.google = userInfo
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new AuthService(singletonEnforcer)
    }
    return this[singleton]
  }

  getUser() {
    return user.google
  }
}
