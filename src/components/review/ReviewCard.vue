<template>
  <div>
    <div>
      Today: {{ studyDateCount }}
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
    <card
      ref="cardComp"
      :card="card"
      :index="index"
      :total="total"
    />
  </div>
</template>

<script>
import EventBus from '@/services/EventBus'
import { REVIEW } from '@/services/api'
import { createNamespacedHelpers } from 'vuex'
import Card from './Card.vue'

const userModule = createNamespacedHelpers('user')
const cardModule = createNamespacedHelpers('card')

export default {
  name: 'ReviewCard',
  components: {
    Card,
  },
  props: {
    cardList: { type: Array, default: () => [] },
  },
  data() {
    return {
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
    total() {
      return this.cardList.length
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
      this.flipCard('front')
    },
    successCard() {
      this.updateCard(REVIEW.SUCCESS)
      this.flipCard('up')
    },
    failCard() {
      this.updateCard(REVIEW.FAIL)
      this.flipCard('down')
    },
    shuffleCard() {
      console.log('shuffleCard')
      this.flipCard('front')
      this.reviewCardList.sort(() => 0.5 - Math.random())
      this.index = 0
    },
    updateCard(result) {
      this.card.lastReviewResult = result
      this.card.dateOfReview = this.studyDateCount
      this.reviewCard(this.card)
    },
    flipCard(direction) {
      this.$refs.cardComp && this.$refs.cardComp.flipCard(direction)
    },
  },
}
</script>

<style>

</style>
