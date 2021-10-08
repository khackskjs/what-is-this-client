<template>
  <div />
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'ScreenOrientation',
  mounted() {
    console.log('ScreenOrientation mounted')
    window.addEventListener('orientationchange', this.handleOrientationChange)
  },
  destroyed() {
    window.removeEventListener('orientationchange', this.handleOrientationChange)
  },
  methods: {
    ...mapActions(['setDeviceOrientation']),
    handleOrientationChange() {
      const orientation = window.screen.orientation.type
      this.setDeviceOrientation(orientation)
    }
  }
}
</script>
