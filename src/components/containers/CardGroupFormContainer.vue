<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Card Group</md-dialog-title>
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
          tabindex="10003"
          class="md-accent delete-button"
          @click="deleteGroup"
        >
          {{ $t('card_group_form_delete_button_title') }}
        </md-button>
        <md-button
          class="md-primary"
          tabindex="10002"
          @click="$emit('close'); showDialog = false"
        >
          {{ $t('card_group_form_close_button_title') }}
        </md-button>
        <md-button
          class="md-raised md-primary"
          tabindex="10001"
          @click="save"
        >
          {{ confirmText }}
        </md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import EventBus from '@/services/EventBus'
import CardGroupForms from '@/components/forms/CardGroupForms'
import { mapGetters, createNamespacedHelpers } from 'vuex'
import Card from '@/store/models/card.model'
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
  mounted() {
    EventBus.$on('review:keyup', (e) => {
      if (e.code === 'Escape') {
        this.hide()
      }
    })
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
@import 'bootstrap/scss/_functions.scss';
@import 'bootstrap/scss/_variables.scss';
@import 'bootstrap/scss/_mixins.scss';

.md-dialog ::v-deep.md-dialog-container {
  min-width: 80%;
  @include media-breakpoint-down(md) {
    min-width: 95%;
  }
  @include media-breakpoint-down(lg) {
    min-width: 85%;
  }
  @include media-breakpoint-up(xl) {
    min-width: 60%;
  }
  @include media-breakpoint-up(xxl) {
    min-width: 55%;
  }
}
.card-group-forms {
  overflow-y: auto;
}
.delete-button {
  margin-right: auto !important;
}
</style>
