<template>
  <div>
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
