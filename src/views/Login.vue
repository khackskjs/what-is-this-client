r<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div id="my-signin2" />
    <!-- <form
      method="GET"
      action="http://localhost:13135/auth/google"
    >
      <input
        id="google_login_btn"
        type="submit"
      >
    </form> -->
  </div>
</template>

<script>
import authService from '@services/auth'

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
      authService.setGoogleUser(user.getBasicProfile())
      this.$router.push({ name: 'Home' })
    },
    onFailure(error) {
      console.error(error)
    },
  }
}
</script>

<style lang="scss" scoped>
#google_login_btn {
  background: url("/images/btn_google_signin_dark_normal_web@2x.png")
      no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  width: 200px;
  height: 50px;
}
</style>