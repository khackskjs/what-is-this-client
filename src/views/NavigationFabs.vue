<template>
  <div class="position-absolute w-100 h-100">
    <div v-if="isAuth">
      <div class="home-btn-area">
        <router-link
          v-if="isShow"
          to="/"
          tag="md-button"
          class="md-fab"
        >
          <md-icon>home</md-icon>
        </router-link>
      </div>
      <div v-if="currentPathName === 'Review'" class="study-date-count-area">
        <span class="badge">STUDY {{ studyDateCount }} <small>th</small></span>
      </div>
      <div class="logout-btn-area">
        <md-button
          class="md-fab md-primary"
          @click="logout"
        >
          <md-icon>logout</md-icon>
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>
import authService from '@/services/auth'
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
    ...userModule.mapActions(['clearLoginInfo']),
    async logout() {
      console.log('clicked logout')
      await authService.logout()
      await this.clearLoginInfo()
      this.$router.push({ name: 'Login' })
      setTimeout(() => {
        this.$router.go()
      }, 300)
    },
  },
}
</script>

<style lang="scss" scoped>
.home-btn-area {
  position: absolute;
  bottom: 10px;
  left: 0px;
}
.study-date-count-area {
  position: absolute;
  top: 10px;
  left: 50%;
  opacity: .8;
  font-size: 1.5rem;
  font-weight: 900;
  background-color: blueviolet;
  transform: translateX(-50%);
}
.logout-btn-area {
  position: absolute;
  bottom: 10px;
  right: 0px;
}
</style>
