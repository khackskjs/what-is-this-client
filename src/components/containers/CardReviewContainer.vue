<template>
  <div>
    Card Review Container
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const cardModule = createNamespacedHelpers('card')

export default {
  name: 'CardReviewContainer',
  data() {
    return {
    }
  },
  computed: {
  },
  mounted() {
    this.getReviewCards()
    console.log('mounted')
  },
  methods: {
    ...cardModule.mapActions(['getReviewCards'])
  }
}
</script>

<style>

</style>
