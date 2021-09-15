<template>
  <div class="position-absolute d-flex justify-content-between w-100">
    <div v-if="isAuth">
      <router-link
        v-if="isShow"
        to="/"
        tag="md-button"
        class="md-fab"
      >
        <md-icon>home</md-icon>
      </router-link>
      <div>
        <md-button
          class="md-fab"
          @click="logout"
        >
          <md-icon>logout</md-icon>
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>
import authService from '@services/auth'
import { createNamespacedHelpers } from 'vuex'

const userModule = createNamespacedHelpers('user')

export default {
  name: 'NavigationFabs',
  data() {
    return {
      currentPath: '',
      currentPathName: '',
      showPaths: [''],
      hidePathNames: ['Home']
    }
  },
  computed: {
    ...userModule.mapGetters(['uuid', 'studyDateCount', 'name']),
    isShow() {
      return !this.hidePathNames.includes(this.currentPathName)
    },
    isAuth() {
      return this.uuid && this.studyDateCount && this.name
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        this.currentPath = route.path
        this.currentPathName = route.name
      }
    }
  },
  methods: {
    async logout() {
      console.log('clicked logout')
      await authService.logout()
      this.$router.push({ name: 'login' })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
