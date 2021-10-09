<template>
  <div class="d-flex justify-content-center">
    <md-button class="md-fab md-mini md-primary" @click="$emit('card-control', 'previous')">
      <md-icon>skip_previous</md-icon>
    </md-button>
    <review-card-meta :review-count="reviewCount" />
    <md-button class="md-fab md-mini md-primary" @click="$emit('card-control', 'next')">
      <md-icon>skip_next</md-icon>
    </md-button>
  </div>
</template>

<script>
import ReviewCardMeta from '../ReviewCardMeta.vue'

export default {
  name: 'ControllerCenter',
  components: {
    ReviewCardMeta
  },
  props: {
    reviewCount: { type: Object, default: () => ({}) },
  },
}
</script>

<style>

</style>