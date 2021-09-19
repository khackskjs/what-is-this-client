<template>
  <div>
    <review-card
      :card-list="cardList"
      :guid-name-map="guidNameMap"
    />
    <div class="d-flex justify-content-center review-result mt-2">
      <span class="badge rounded-pill bg-secondary">{{ total['0'] }}</span>
      <span class="badge rounded-pill bg-danger count-space">{{ total['2'] }}</span>
      <span class="badge rounded-pill bg-success">{{ total['1'] }}</span>
    </div>
  </div>
</template>

<script>
import ReviewCard from '@/components/review/ReviewCard.vue'

import { createNamespacedHelpers } from 'vuex'
const cardModule = createNamespacedHelpers('card')
const userModule = createNamespacedHelpers('user')

export default {
  name: 'CardReviewContainer',
  components: {
    ReviewCard,
  },
  data() {
    return {
    }
  },
  computed: {
    ...userModule.mapGetters(['studyDateCount']),
    ...cardModule.mapGetters(['reviewCardList', 'groupList']),
    cardList() {
      return this.reviewCardList
    },
    guidNameMap() {
      return this.groupList.reduce((prev, group) => {
        prev[group.guid] = group.name
        return prev
      }, {})
    },
    total() {
      return this.cardList.reduce((prev, card) => {
        prev[card.lastReviewResult]++
        prev.total++
        return prev
      }, { '0': 0, '1': 0, '2': 0, total: 0 })
    },
  },
  async mounted() {
    await this.getReviewCards(this.studyDateCount)
    const guidList = [ ...new Set(this.cardList.map(card => +card.guid)) ]
    this.getCardGroupList(guidList)
  },
  methods: {
    ...cardModule.mapActions(['getReviewCards', 'getCardGroupList']),
  }
}
</script>

<style>
.review-result {
  font-size: 20px !important;
}
.count-space {
  margin-left: .5rem !important;
  margin-right: .5rem !important;
}
</style>
