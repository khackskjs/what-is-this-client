<template>
  <div v-if="result">
    <span
      class="badge rounded-pill"
      :class="badgeClass"
    >
      {{ resultText }}
    </span>
  </div>
</template>

<script>
import { REVIEW } from '@/services/api'

export default {
  name: 'ReviewBadge',
  props: {
    result: { type: Number, default: 0 },
  },
  computed: {
    resultText() {
      return this.result === REVIEW.SUCCESS ?
        'SUCCESS' : this.result === REVIEW.FAILURE ? 'FAILURE' : ''
    },
    badgeClass() {
      return this.result === REVIEW.SUCCESS ?
        'bg-success' : this.result === REVIEW.FAILURE ? 'bg-danger' : ''
    },
  },
}
</script>
