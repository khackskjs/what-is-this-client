<template>
  <div class="position-relative d-flex justify-content-between">
    <div>
      <md-button class="md-fab md-mini md-primary" @click="$emit('card-control', 'shuffle')">
        <md-icon>shuffle</md-icon>
      </md-button>
      <md-button class="md-fab md-mini md-primary" @click="$emit('card-control', 'arrange')">
        <md-icon>format_list_numbered</md-icon>
      </md-button>
    </div>
    <div class="position-absolute start-50">
      <div class="d-flex translate-middle-x">
        <md-button class="md-fab md-mini md-primary" @click="$emit('card-control', 'previous')">
          <md-icon>skip_previous</md-icon>
        </md-button>
        <review-card-meta :review-count="reviewCount" />
        <md-button class="md-fab md-mini md-primary" @click="$emit('card-control', 'next')">
          <md-icon>skip_next</md-icon>
        </md-button>
      </div>
    </div>
    <div>
      <md-button class="md-fab md-mini md-primary" @click="$emit('card-control', 'cancel')">
        <md-icon>visibility_off</md-icon>
      </md-button>
      <md-button class="md-fab md-mini md-primary" @click="$emit('card-control', 'success')">
        <md-icon>task_alt</md-icon>
      </md-button>
      <md-button class="md-fab md-mini md-primary" @click="$emit('card-control', 'fail')">
        <md-icon>highlight_off</md-icon>
      </md-button>
    </div>
  </div>
</template>

<script>
import ReviewCardMeta from './ReviewCardMeta.vue'

export default {
  name: 'ReviewCardController',
  components: {
    ReviewCardMeta,
  },
  props: {
    reviewCount: { type: Object, default: () => ({}) },
  },
}
</script>

<style lang="scss" scoped>
.test {
  transform: translateX(-50%);
}
</style>