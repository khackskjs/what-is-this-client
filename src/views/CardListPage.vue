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
      @close="onCardGroupFormClosed"
    />
  </div>
</template>

<script>
import CardGroupListContainer from '@/components/containers/CardGroupListContainer'
import CardGroupFormContainer from '@/components/containers/CardGroupFormContainer'

import { createNamespacedHelpers } from 'vuex'
const cardModule = createNamespacedHelpers('card')

export default {
  name: 'CardListPage',
  components: {
    CardGroupListContainer,
    CardGroupFormContainer,
  },
  methods: {
    ...cardModule.mapGetters(['getCardGroupList']),
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
    async onCardGroupFormClosed(saved) {
      console.log('closed form', saved)
      if (saved) {
        await this.getCardGroupList()
      }
    }
  }
}
</script>

<style>

</style>