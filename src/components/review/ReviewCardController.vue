<template>
  <div class="d-flex flex-wrap">
    <controller-left class="control-left" />
    <controller-center
      class="control-center"
      :review-count="reviewCount"
      @card-control="$emit('card-control', $event)"
    />
    <controller-right class="control-right" />
    <controller-center-for-narrow
      class="control-center-for-narrow"
      @card-control="$emit('card-control', $event)"
    />
  </div>
</template>

<script>
// import ReviewCardMeta from './ReviewCardMeta.vue'
import ControllerLeft from './controller/ControllerLeft.vue'
import ControllerCenter from './controller/ControllerCenter.vue'
import ControllerCenterForNarrow from './controller/ControllerCenterForNarrow.vue'
import ControllerRight from './controller/ControllerRight.vue'

export default {
  name: 'ReviewCardController',
  components: {
    // ReviewCardMeta,
    ControllerLeft,
    ControllerCenter,
    ControllerRight,
    ControllerCenterForNarrow,
  },
  props: {
    reviewCount: { type: Object, default: () => ({}) },
  },
}
</script>

<style lang="scss" scoped>
@import 'bootstrap/scss/_functions.scss';
@import 'bootstrap/scss/_variables.scss';
@import 'bootstrap/scss/_mixins.scss';

.control-left {
  flex-basis: 33.333333%;
  order: 1;
  justify-content: left;
  @include media-breakpoint-down(lg) {
    display: none !important;
    // flex-basis: 50%;
    // justify-content: right;
    // order: 2;
  }
}
.control-center {
  flex-basis: 33.333333%;
  order: 2;
  @include media-breakpoint-down(lg) {
    flex-basis: 100%;
    order: 1;
  }
}
.control-right {
  flex-basis: 33.333333%;
  order: 3;
  justify-content: right;
  @include media-breakpoint-down(lg) {
    display: none !important;
    // flex-basis: 50%;
    // justify-content: left;
  }
}
.control-center-for-narrow {
  display: none !important;
  order: 4;
  @include media-breakpoint-down(lg) {
    flex-basis: 100%;
    display: block !important;
  }
}
</style>
