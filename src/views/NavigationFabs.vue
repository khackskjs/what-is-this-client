<template>
  <div class="position-absolute d-flex justify-content-between w-100">
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
</template>

<script>
import authService from '@services/auth'
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
    isShow() {
      return !this.hidePathNames.includes(this.currentPathName)
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
    logout() {
      authService.logout()
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
