<template>
  <div class="d-flex">
    <md-button class="md-fab md-mini md-primary" @click="$emit('card-control', 'cancel')">
      <md-icon>visibility_off</md-icon>
    </md-button>
    <md-button class="md-fab md-mini md-primary" @click="$emit('card-control', 'success')">
      <md-icon>task_alt</md-icon>
    </md-button>
    <md-button class="md-fab md-mini md-primary" @click="$emit('card-control', 'fail')">
      <md-icon>highlight_off</md-icon>
    </md-button>
  </div>
</template>

<script>
export default {
  name: 'ControllerRight'
}
</script>

<style>

</style>