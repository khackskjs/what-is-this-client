<template>
  <div>
    <span class="badge rounded-pill bg-light text-dark count-text">
      {{ current }} / {{ total }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'ReviewCount',
  props: {
    current: { type: Number, default: () => 0 },
    total: { type: Number, default: () => 0 },
  },
}
</script>

<style lang="scss" scoped>
.count-text {
  font-size: 1rem;
}
</style>