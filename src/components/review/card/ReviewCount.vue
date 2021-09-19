<template>
  <div>
    <span class="badge rounded-pill bg-light text-dark">
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
