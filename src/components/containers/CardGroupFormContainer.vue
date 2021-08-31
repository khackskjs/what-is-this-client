<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <card-group-forms
        class="card-group-forms"
        :guid="model.cardGroup.guid"
        :group-name="model.cardGroup.name"
        :base-date="studyDateCount"
        :card-text-list="model.cardList"
      />

      <md-dialog-actions>
        <md-button
          class="md-primary"
          @click="showDialog = false"
        >
          {{ $t('card_group_form_close_button_title') }}
        </md-button>
        <md-button
          class="md-primary"
          @click="showDialog = false"
        >
          {{ confirmText }}
        </md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import CardGroupForms from '@/components/forms/CardGroupForms'
import { mapGetters } from 'vuex'
import { createNamespacedHelpers } from 'vuex'
const userModule = createNamespacedHelpers('user')

export default {
  name: 'CardGroupFormContainer',
  components: {
    CardGroupForms,
  },
  props: {
  },
  data() {
    return {
      model: {
        cardGroup: {
          guid: '',
          name: '',
        },
        cardList: [],
      },
      mode: 'create',
      showDialog: false
    }
  },
  computed: {
    ...mapGetters(['selectedCardGroup', 'selectedCardList']),
    ...userModule.mapGetters(['studyDateCount']),
    isCreateMode() {
      return this.mode === 'create'
    },
    confirmText() {
      return this.isCreateMode ? this.$t('card_group_form_create_button_title') : this.$t('card_group_form_update_button_title')
    },
  },
  methods: {
    show({ mode } = {}) {
      this.mode = mode ? mode : 'create'
      this.model.cardList = this.isCreateMode ? [] : this.selectedCardList
      this.model.cardGroup = this.isCreateMode ? {} : this.selectedCardGroup
      this.showDialog = true
    },
    hide() {
      this.showDialog = false
    },
  },
}
</script>

<style lang="scss" scoped>
.md-dialog ::v-deep.md-dialog-container {
  max-width: 768px;
}
.card-group-forms {
  overflow-y: auto;
}
</style>