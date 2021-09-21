<template>
  <div>
    <div>
      Today: {{ studyDateCount }}
    </div>
    <div class="d-flex justify-content-center">
      <md-button
        class="md-raised md-primary"
        @click="arrangeCardsOrder(reviewCardList)"
      >
        {{ $t('review__arrange_order_button') }}
      </md-button>
      <md-button
        class="md-raised md-primary"
        @click="shuffleCard(reviewCardList)"
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
    <card
      ref="cardComp"
      :card="card"
      :index="index"
      :total="total"
      :guid-name-map="guidNameMap"
    />
  </div>
</template>

<script>
import EventBus from '@/services/EventBus'
import { REVIEW } from '@/services/api'
import { createNamespacedHelpers } from 'vuex'
import Card from './card/Card.vue'

const userModule = createNamespacedHelpers('user')
const cardModule = createNamespacedHelpers('card')

export default {
  name: 'ReviewCard',
  components: {
    Card,
  },
  props: {
    cardList: { type: Array, default: () => [] },
    guidNameMap: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      index: 0,
      cardDirection: 'front',
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
    isFrontSide() {
      return this.$refs.cardComp && this.$refs.cardComp.isFrontSide()
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
      } else if (e.code === 'Enter') {
        this.showFrontSide()  // 리뷰 결과에 영향을 미치지 않고, 앞면만 보여줍니다.
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
      this.cardDirection = 'front'
    },
    nextCard() {
      this.index = this.index === this.total - 1 ? this.total - 1 : this.index + 1
      this.cardDirection = 'front'
    },
    cancelReview() {
      this.updateCard(REVIEW.NONE)
      this.flipCard('front')
    },
    successCard() {
      this.updateCard(REVIEW.SUCCESS)
      this.cardDirection === 'up' ? this.nextCard() : this.flipCard('up')
    },
    failCard() {
      this.updateCard(REVIEW.FAILURE)
      this.cardDirection === 'down' ? this.nextCard() : this.flipCard('down')
    },
    shuffleCard(cardList) {
      this.flipCard('front')
      cardList.sort(() => 0.5 - Math.random())
      this.arrangeCardsOrder(cardList)
    },
    updateCard(result) {
      this.card.lastReviewResult = result
      this.card.dateOfReview = this.studyDateCount
      this.reviewCard(this.card)
    },
    flipCard(direction) {
      if (this.$refs.cardComp) {
        this.cardDirection = direction
        this.$refs.cardComp.flipCard(direction)
      }
    },
    arrangeCardsOrder(cardList) {
      cardList.filter(c => c.lastReviewResult === REVIEW.NONE)
      cardList.sort((c1, ) => c1.lastReviewResult === REVIEW.NONE ? -1 : c1.lastReviewResult === REVIEW.FAILURE ? 0 : 1)
      this.index = 0
    },
    showFrontSide() {
      this.flipCard('front')
    }
  },
}
</script>

<style>

</style>
