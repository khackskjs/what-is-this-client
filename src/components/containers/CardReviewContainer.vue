<template>
  <div>
    <review-card
      :card-list="cardList"
      :guid-name-map="guidNameMap"
    />
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
