<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <card-group-forms
        class="card-group-forms"
        :guid="model.cardGroup.guid"
        :group-name.sync="model.cardGroup.name"
        :base-date="studyDateCount"
        :card-text-list="model.cardList"
      />

      <md-dialog-actions>
        <md-button
          v-if="!isCreateMode"
          class="md-accent delete-button"
          @click="deleteGroup"
        >
          {{ $t('card_group_form_delete_button_title') }}
        </md-button>
        <md-button
          class="md-primary"
          @click="$emit('close'); showDialog = false"
        >
          {{ $t('card_group_form_close_button_title') }}
        </md-button>
        <md-button
          class="md-raised md-primary"
          @click="save"
        >
          {{ confirmText }}
        </md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import CardGroupForms from '@/components/forms/CardGroupForms'
import { mapGetters, createNamespacedHelpers } from 'vuex'
import { Card } from '@store/models/card.model'
const userModule = createNamespacedHelpers('user')
const cardModule = createNamespacedHelpers('card')

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
    ...cardModule.mapActions(['saveCardGroup', 'saveCardList', 'deleteCardGroup']),
    show({ mode } = {}) {
      this.mode = mode ? mode : 'create'
      this.model.cardList = this.isCreateMode ? [] : this.selectedCardList
      this.model.cardGroup = this.isCreateMode ? {} : this.selectedCardGroup
      this.showDialog = true
    },
    hide() {
      this.showDialog = false
    },
    async save() {
      const cardGroup = await this.saveCardGroup(this.model.cardGroup)
      
      if (!cardGroup.guid) {
        return console.error('no guid created')
      }

      if (this.model.cardList.length) {
        const cardList = this.model.cardList.map(card => Card.parse(card))
        cardList.forEach(c => { c.guid = cardGroup.guid; c.dateForNextReview = this.studyDateCount })
  
        await this.saveCardList(cardList)
      }

      this.showDialog = false
      this.$emit('close', { reload: true })
    },
    async deleteGroup() {
      await this.deleteCardGroup(this.model.cardGroup.guid)
      this.$emit('close')
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
.delete-button {
  margin-right: auto !important;
}
</style>