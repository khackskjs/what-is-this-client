<template>
  <div>
    <span class="badge rounded-pill bg-light text-dark">
      {{ index }} / {{ total }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'ReviewCount',
  props: {
    index: { type: Number, default: () => 0 },
    total: { type: Number, default: () => 0 },
  },
}
</script>

<style>

</style>
