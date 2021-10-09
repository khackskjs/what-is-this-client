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
  destroyed() {
    window.removeEventListener('orientationchange', this.handleOrientationChange)
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    ...mapActions(['setDeviceOrientation', 'setInnerWidthHieght']),
    handleOrientationChange() {
      const orientation = window.screen.orientation.type
      console.log('- handleOrientationChange', orientation)
      this.setDeviceOrientation(orientation)
      this.onResize()
    },
    onResize() {
      console.log(`- onResize(${window.innerWidth}, ${window.innerHeight})`)
      this.setInnerWidthHieght({ width: window.innerWidth, height: window.innerHeight })
      document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`)
    },
  }
}
</script>
