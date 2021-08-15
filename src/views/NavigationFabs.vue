<template>
  <div class="position-absolute">
    <router-link
      v-if="isShow"
      to="/"
      tag="md-button"
      class="md-fab"
    >
      <md-icon>home</md-icon>
    </router-link>
  </div>
</template>

<script>
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
}
</script>

<style lang="scss" scoped>
</style>
