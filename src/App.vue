<template>
  <div id="app">
    <screen-orientation />
    <navigation-fabs />
    <router-view />
  </div>
</template>

<script>
import EventBus from '@/services/EventBus'

function onKeyup(e) {
  EventBus.$emit('review:keyup', e)
}

import NavigationFabs from '@/views/NavigationFabs'
import ScreenOrientation from '@/util/ScreenOrientation'

export default {
  components: {
    NavigationFabs,
    ScreenOrientation
  },
  mounted() {
    window.addEventListener('keyup', onKeyup)
  },
  beforeDestroy() {
    window.removeEventListener('keyup', onKeyup)
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
