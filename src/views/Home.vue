<template>
  <div>
    <div class="md-layout min-vh-100">
      <router-link
        to="/card-review"
        tag="md-button"
        class="md-layout-item md-raised md-primary h-auto"
      >
        REVIEW
      </router-link>
      <router-link
        to="/card-management"
        tag="md-button"
        class="md-layout-item md-raised md-accent h-auto"
      >
        EDIT
      </router-link>
      <!-- <div class="md-layout-item">
        <md-button class="md-raised md-primary">
          EDIT
        </md-button>
      </div> -->

      <!-- <md-button class="md-fab md-primary">
        <md-icon class="md-size-2x">
          edit_note
        </md-icon>
      </md-button> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
}
</script>
