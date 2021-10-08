<template>
  <div>
    <div class="d-flex justify-content-center review-result mt-2">
      <!-- <md-button class="md-fab md-mini md-primary" @click="shuffleReviewCard">
        <md-icon>shuffle</md-icon>
      </md-button>
      <md-button class="md-fab md-mini md-primary" @click="shuffleReviewCard">
        <md-icon>format_list_numbered</md-icon>
      </md-button>

      <md-button class="md-fab md-mini md-primary" @click="shuffleReviewCard">
        <md-icon>skip_previous</md-icon>
      </md-button>
      <div class="my-auto">
        <span class="badge rounded-pill bg-secondary">{{ total['0'] }}</span>
        <span class="badge rounded-pill bg-danger count-space">{{ total['2'] }}</span>
        <span class="badge rounded-pill bg-success">{{ total['1'] }}</span>
      </div>
      <md-button class="md-fab md-mini md-primary" @click="shuffleReviewCard">
        <md-icon>skip_next</md-icon>
      </md-button> -->

      <review-card-meta :review-count="reviewCount" />

      <!-- <md-button class="md-fab md-mini md-primary" @click="shuffleReviewCard">
        <md-icon>visibility_off</md-icon>
      </md-button>
      <md-button class="md-fab md-mini md-primary" @click="shuffleReviewCard">
        <md-icon>task_alt</md-icon>
      </md-button>
      <md-button class="md-fab md-mini md-primary" @click="shuffleReviewCard">
        <md-icon>highlight_off</md-icon>
      </md-button> -->
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

<style>

</style>