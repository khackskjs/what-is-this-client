<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <card-group-forms
        class="forms"
        :guid="model.cardGroup.guid"
        :group-name="model.cardGroup.name"
        :base-date="1"
        :card-text-list="model.cardList"
      />

      <md-dialog-actions>
        <md-button
          class="md-primary"
          @click="showDialog = false"
        >
          Close
        </md-button>
        <md-button
          class="md-primary"
          @click="showDialog = false"
        >
          Save
        </md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import CardGroupForms from '@/components/forms/CardGroupForms'
import { mapGetters } from 'vuex'

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
      showDialog: false
    }
  },
  computed: {
    ...mapGetters(['selectedCardGroup', 'selectedCardList']),
  },
  watch: {
    selectedCardList: {
      immediate: true,
      handler(val) {
        this.model.cardList = val
      },
    },
    selectedCardGroup: {
      immediate: true,
      handler(val) {
        this.model.cardGroup = val
      },
    },
  },
  methods: {
    show() {
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
.forms {
  // height: 100%;
  overflow-y: auto;
}
</style>