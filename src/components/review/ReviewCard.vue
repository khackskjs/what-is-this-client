<template>
  <div>
    <div>
      {{ index }} / {{ total }} (Total) - Today: {{ studyDateCount }}
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
      {{ card.text1 }} || {{ card.lastReviewResult }} || {{ card.dateOfReview }}
    </div>
  </div>
</template>

<script>
import EventBus from '@/services/EventBus'
import { REVIEW } from '@/services/api'
import { createNamespacedHelpers } from 'vuex'

const userModule = createNamespacedHelpers('user')
const cardModule = createNamespacedHelpers('card')

export default {
  name: 'ReviewCard',
  props: {
    cardList: { type: Array, default: () => [] },
  },
  data() {
    return {
      total: this.cardList.length,
      index: 0,
    }
  },
  computed: {
    ...userModule.mapGetters(['studyDateCount']),
    card() {
      return this.reviewCardList[this.index] || {}
    },
    reviewCardList() {
      return this.cardList
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
    EventBus.$off('review:keyup')
  },
  methods: {
    ...cardModule.mapActions(['reviewCard']),
    prevCard() {
      this.index = this.index === 0 ? 0 : this.index - 1
      console.log('prev')
    },
    nextCard() {
      this.index = this.index === this.total - 1 ? this.total - 1 : this.index + 1
      console.log('next')
    },
    cancelReview() {
      this.updateCard(REVIEW.NONE)
      console.log('cancelReview')
    },
    successCard() {
      this.updateCard(REVIEW.SUCCESS)
      console.log('successCard')
    },
    failCard() {
      this.updateCard(REVIEW.FAIL)
      console.log('failCard')
    },
    shuffleCard() {
      this.reviewCardList.sort(() => 0.5 - Math.random())
      this.index = 0
      console.log('shuffleCard')
    },
    updateCard(result) {
      this.card.lastReviewResult = result
      this.card.dateOfReview = this.studyDateCount
      this.reviewCard(this.card)
    },
  },
}
</script>

<style>

</style>
