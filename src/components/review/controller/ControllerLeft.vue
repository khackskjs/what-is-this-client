<template>
  <div class="d-flex">
    <md-button class="md-fab md-mini md-primary" @click="$emit('card-control', 'shuffle')">
      <md-icon>shuffle</md-icon>
    </md-button>
    <md-button class="md-fab md-mini md-primary" @click="$emit('card-control', 'arrange')">
      <md-icon>format_list_numbered</md-icon>
    </md-button>
  </div>
</template>

<script>
export default {
  name: 'ControllerLeft',
}
</script>

<style>

</style>