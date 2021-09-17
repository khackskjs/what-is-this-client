<template>
  <div>
    Card Review Container
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const cardModule = createNamespacedHelpers('card')
const userModule = createNamespacedHelpers('user')

export default {
  name: 'CardReviewContainer',
  data() {
    return {
    }
  },
  computed: {
    ...userModule.mapGetters(['studyDateCount']),
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
