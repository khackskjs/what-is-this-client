<template>
  <div class="md-layout" :style="{ height: `${deviceInnerHeight}px` }">
    <router-link
      to="/review"
      tag="md-button"
      class="md-layout-item md-small-size-100 md-raised md-primary h-auto"
    >
      <md-icon class="md-size-3x">
        school
      </md-icon>
    </router-link>
    <router-link
      to="/management"
      tag="md-button"
      class="md-layout-item md-small-size-100 md-raised md-accent h-auto menu-icon-size"
    >
      <md-icon class="md-size-3x">
        post_add
      </md-icon>
    </router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {},
  computed: {
    ...mapGetters(['deviceInnerHeight']),
  },
}
</script>

<style lang="scss" scoped>
.menu-icon-size {
  font: 2em !important;
}
</style>