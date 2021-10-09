<template>
  <div class="d-flex justify-content-center">
    <md-button class="md-fab md-mini md-primary" @click="$emit('card-control', 'shuffle')">
      <md-icon>shuffle</md-icon>
    </md-button>
    <md-button class="md-fab md-mini md-primary" @click="$emit('card-control', 'arrange')">
      <md-icon>format_list_numbered</md-icon>
    </md-button>
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
  name: 'ControllerCenterForNarrow'
}
</script>

<style>

</style>