<template>
  <div />
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'ScreenOrientation',
  mounted() {
    window.addEventListener('orientationchange', this.handleOrientationChange)
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },
  beforeDestroy() {
    window.removeEventListener('orientationchange', this.handleOrientationChange)
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    ...mapActions(['setDeviceOrientation', 'setInnerWidthHieght']),
    handleOrientationChange() {
      const orientation = window.screen.orientation.type
      this.setDeviceOrientation(orientation)
      this.onResize()
    },
    onResize() {
      this.setInnerWidthHieght({ width: window.innerWidth, height: window.innerHeight })
      document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`)
    },
  }
}
</script>
