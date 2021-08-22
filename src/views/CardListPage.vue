<template>
  <div>
    <div>
      <md-button
        class="md-raised md-primary"
        @click="addCardGroup"
      >
        <md-icon>note_add</md-icon>
      </md-button>
    </div>
    <card-group-list-container
      @select="onSelect"
    />
    <card-group-form-container
      ref="cg-form-container"
    />
  </div>
</template>

<script>
import CardGroupListContainer from '@/components/containers/CardGroupListContainer'
import CardGroupFormContainer from '@/components/containers/CardGroupFormContainer'

export default {
  name: 'CardListPage',
  components: {
    CardGroupListContainer,
    CardGroupFormContainer,
  },
  methods: {
    onSelect() {
      this.showCardGroupFormDialog('update')
    },
    addCardGroup() {
      this.showCardGroupFormDialog()
    },
    showCardGroupFormDialog(mode) {
      const modal = this.$refs['cg-form-container']
      if (modal) {
        modal.show({ mode })
      }
    },
  }
}
</script>

<style>

</style>