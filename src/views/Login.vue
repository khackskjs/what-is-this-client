<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div id="my-signin2" />
  </div>
</template>

<script>
import { AuthService } from '@services/auth'

export default {
  mounted() {
    window.addEventListener('google-oauth-library-load', this.renderSigninButton)
  },
  methods: {
    renderSigninButton() {
      window.gapi.signin2.render('my-signin2', {
        scope: 'profile email',
        width: 240,
        height: 50,
        longtitle: true,
        onsuccess: this.onSuccess,
        onfailure: this.onFailure,
      })
    },
    async signout() {
      const authInstance = window.gapi.auth2.getAuthInstance()
      await authInstance.signOut()
    },
    onSuccess(user) {
      AuthService.instance.setGoogleUser(user.getBasicProfile())
    },
    onFailure(error) {
      console.error(error)
    }
  }
}
</script>
