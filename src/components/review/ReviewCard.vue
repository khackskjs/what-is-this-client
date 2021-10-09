<template>
  <div class="card-review-area mx-auto">
    <card
      ref="cardComp"
      :card="card"
      :index="index"
      :total="total"
      :guid-name-map="guidNameMap"
      :card-height="cardHeight"
      @touch:card="onCardControl"
    />
    <review-card-controller
      class="mt-1"
      :review-count="reviewCount"
      @card-control="onCardControl"
    />
  </div>
</template>

<script>
import EventBus from '@/services/EventBus'
import { REVIEW } from '@/services/api'
import { createNamespacedHelpers, mapGetters } from 'vuex'
import Card from './card/Card.vue'
import ReviewCardController from './ReviewCardController.vue'

const CARD_RESULT_PRIORITY = { 
  [REVIEW.FAILURE]: 1,
  [REVIEW.NONE]: 2,
  [REVIEW.SUCCESS]: 3,
}

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
    ...mapGetters(['deviceInnerHeight']),
    ...userModule.mapGetters(['studyDateCount']),
    cardHeight() {
      const cardHeight = `${this.deviceInnerHeight - 130}px`
      return cardHeight
    },
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
      this.arrangeCardsOrderByResult()
      this.index = 0
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
    arrangeCardsOrderByResult() {
      this.reviewCardList.sort((c1, c2) => CARD_RESULT_PRIORITY[c1.lastReviewResult] - CARD_RESULT_PRIORITY[c2.lastReviewResult])
    },
    arrangeCardsOrder() {
      this.reviewCardList.sort((c1, c2) => {
        if (c1.lastReviewResult !== c2.lastReviewResult) {
          return CARD_RESULT_PRIORITY[c1.lastReviewResult] - CARD_RESULT_PRIORITY[c2.lastReviewResult]
        }
        return c1.cuid - c2.cuid
      })
      this.index = 0
    },
    showFrontSide() {
      this.flipCard('front')
    },
    onCardControl(event) {
      switch (event) {
        case 'up':
        case 'success':
          this.successCard()
          break
        case 'down':
        case 'fail':
          this.failCard()
          break
        case 'left':
        case 'previous':
          this.prevCard()
          break
        case 'right':
        case 'next':
          this.nextCard()
          break
        case 'center':
        case 'cancel':
          this.cancelReview()
          break
        case 'shuffle':
          this.shuffleCard()
          break
        case 'arrange':
          this.arrangeCardsOrder()
          break
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.card-review-area {
  max-width: 1280px;
}
</style>
