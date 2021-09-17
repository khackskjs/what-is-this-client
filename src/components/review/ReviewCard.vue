<template>
  <div>
    <div>
      Total : {{ index }} / {{ total }}
    </div>
    <div class="d-flex justify-content-center">
      <md-button
        class="md-raised md-primary"
        @click="shuffleCard"
      >
        {{ $t('review__shuffle_button') }}
      </md-button>
      <md-button
        class="md-raised md-primary"
      >
        {{ $t('review__cancel_button') }}
      </md-button>
      <md-button
        class="md-raised md-primary"
      >
        {{ $t('review__success_button') }}
      </md-button>
      <md-button
        class="md-raised md-primary"
      >
        {{ $t('review__failure_button') }}
      </md-button>
      <md-button
        class="md-raised md-primary"
      >
        {{ $t('review__prev_button') }}
      </md-button>
      <md-button
        class="md-raised md-primary"
      >
        {{ $t('review__next_button') }}
      </md-button>
    </div>
    <div>
      {{ Object.values(reviewCardList).map(c => c.text1) }}
    </div>
    <div>
      {{ reviewCard.text1 }} || {{ reviewCard.lastReviewResult }}
    </div>
  </div>
</template>

<script>
import EventBus from '@/services/EventBus'
import { REVIEW } from '@/services/api'

export default {
  name: 'ReviewCard',
  props: {
    cardList: { type: Array, default: () => [] },
  },
  data() {
    return {
      total: this.cardList.length,
      index: 0,
      reviewCardList: [ ...this.cardList ],
    }
  },
  computed: {
    reviewCard() {
      return this.reviewCardList[this.index] || {}
    },
  },
  mounted() {
    EventBus.$on('review:keyup', (e) => {
      if (e.code === 'ArrowLeft') {
        this.prevCard()
      } else if (e.code === 'ArrowRight') {
        this.nextCard()
      } else if (e.code === 'ArrowUp') {
        this.successCard()
      } else if (e.code === 'ArrowDown') {
        this.failCard()
      } else if (e.code === 'Space') {
        this.cancelReview()
      }
      console.log(`index/total: ${this.index}/${this.total}`)
    })
  },
  beforeDestroy() {
    console.log('beforeDestroy')
    EventBus.$off('review:keyup')
  },
  methods: {
    prevCard() {
      this.index = this.index === 0 ? 0 : this.index - 1
      console.log('prev')
    },
    nextCard() {
      this.index = this.index === this.total - 1 ? this.total - 1 : this.index + 1
      console.log('next')
    },
    cancelReview() {
      this.reviewCard.lastReviewResult = REVIEW.NONE
      console.log('cancelReview')
    },
    successCard() {
      this.reviewCard.lastReviewResult = REVIEW.SUCCESS
      console.log('successCard')
    },
    failCard() {
      this.reviewCard.lastReviewResult = REVIEW.FAIL
      console.log('failCard')
    },
    shuffleCard() {
      this.reviewCardList.sort(() => 0.5 - Math.random())
      this.index = 0
      console.log('shuffleCard')
    },
  },
}
</script>

<style>

</style>
