<template>
  <div>
    <div>
      Today: {{ studyDateCount }}
    </div>
    <card
      ref="cardComp"
      :card="card"
      :index="index"
      :total="total"
      :guid-name-map="guidNameMap"
      @touch:card="onCardTouch"
    />
    <review-card-controller
      :review-count="reviewCount"
    />
  </div>
</template>

<script>
import EventBus from '@/services/EventBus'
import { REVIEW } from '@/services/api'
import { createNamespacedHelpers } from 'vuex'
import Card from './card/Card.vue'
import ReviewCardController from './ReviewCardController.vue'

const userModule = createNamespacedHelpers('user')
const cardModule = createNamespacedHelpers('card')

export default {
  name: 'ReviewCard',
  components: {
    Card,
    ReviewCardController,
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
    reviewCount() {
      const object = this.cardList.reduce((prev, card) => {
        prev[card.lastReviewResult]++
        prev.total++
        return prev
      }, { '0': 0, '1': 0, '2': 0, total: 0 })
      return {
        none: object[0],
        success: object[1],
        failure: object[2],
        total: object.total,
      }
    },
  },
  mounted() {
    EventBus.$on('review:keyup', (e) => {
      if (e.code === 'ArrowUp') {
        this.successCard()
      } else if (e.code === 'ArrowDown') {
        this.failCard()
      } else if (e.code === 'ArrowLeft') {
        this.prevCard()
      } else if (e.code === 'ArrowRight') {
        this.nextCard()
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
    shuffleCard() {
      this.flipCard('front')
      this.reviewCardList.sort(() => 0.5 - Math.random())
      this.arrangeCardsOrder()
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
    arrangeCardsOrder() {
      this.reviewCardList.filter(c => c.lastReviewResult === REVIEW.NONE)
      this.reviewCardList.sort((c1, ) => c1.lastReviewResult === REVIEW.NONE ? -1 : c1.lastReviewResult === REVIEW.FAILURE ? 0 : 1)
      this.index = 0
    },
    showFrontSide() {
      this.flipCard('front')
    },
    onCardTouch(event) {
      if (event === 'up') {
        this.successCard()
      } else if (event === 'down') {
        this.failCard()
      } else if (event === 'left') {
        this.prevCard()
      } else if (event === 'right') {
        this.nextCard()
      } else if (event === 'center') {
        this.cancelReview()
      }

      console.log('onCardTouch', event)
    }
  },
}
</script>

<style>

</style>
