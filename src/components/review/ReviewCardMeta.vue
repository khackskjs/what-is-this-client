<template>
  <div class="review-result my-auto">
    <span class="badge rounded-pill bg-secondary">{{ reviewCount['none'] }}</span>
    <span class="badge rounded-pill bg-danger count-space">{{ reviewCount['success'] }}</span>
    <span class="badge rounded-pill bg-success">{{ reviewCount['failure'] }}</span>
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
</style>