<template>
  <div class="review-result my-auto">
    <span class="badge rounded-pill bg-danger">{{ reviewCount['failure'] }}</span>
    <span class="badge rounded-pill bg-secondary count-space">{{ reviewCount['none'] }}</span>
    <span class="badge rounded-pill bg-success">{{ reviewCount['success'] }}</span>
  </div>
</template>

<script>
export default {
  name: 'ReviewCardMeta',
  props: {
    reviewCount: { type: Object, default: () => ({}) },
  }
}
</script>

<style lang="scss" scoped>
.review-result {
  font-size: 20px !important;
}
.count-space {
  margin-left: .5rem !important;
  margin-right: .5rem !important;
}

</style>