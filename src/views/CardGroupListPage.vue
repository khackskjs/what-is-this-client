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

import { createNamespacedHelpers, mapActions } from 'vuex'
const cardModule = createNamespacedHelpers('card')

export default {
  name: 'CardGroupListPage',
  components: {
    CardGroupListContainer,
    CardGroupFormContainer,
  },
  methods: {
    ...cardModule.mapActions(['getCardGroupList']),
    ...mapActions(['selectCardGroupUuid']),
    onSelect() {
      this.showCardGroupFormDialog({ mode: 'update' })
    },
    addCardGroup() {
      this.selectCardGroupUuid(null)
      this.showCardGroupFormDialog()
    },
    showCardGroupFormDialog({ mode } = {}) {
      const modal = this.$refs['cg-form-container']
      if (modal) {
        modal.show({ mode })
      }
    },
    async onCardGroupFormClosed({ reload } = {}) {
      if (reload) {
        await this.getCardGroupList()
      }
    }
  }
}
</script>

<style>

</style>