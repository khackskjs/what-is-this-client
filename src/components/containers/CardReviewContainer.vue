<template>
  <div>
    Card Review Container
    <review-card :card-list="reviewCardList" />
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
    ...cardModule.mapGetters(['reviewCardList']),
  },
  mounted() {
    this.getReviewCards(this.studyDateCount)
    console.log('mounted')
  },
  methods: {
    ...cardModule.mapActions(['getReviewCards']),
  }
}
</script>

<style>

</style>
