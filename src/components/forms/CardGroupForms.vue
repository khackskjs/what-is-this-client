<template>
  <div style="padding: 1rem">
    <div class="container-fluid">
      <div class="md-layout">
        <md-field>
          <label>Group Name</label>
          <md-input v-model="model.groupName" />
        </md-field>
      </div>
      <div class="md-layout">
        <md-field>
          <label>Base Day</label>
          <md-input v-model="model.groupName" />
        </md-field>
      </div>
      
      <div class="md-layout">
        <md-button
          class="md-raised md-primary"
          @click="addCard"
        >
          카드 추가
        </md-button>
      </div>
      <div
        v-for="(cardText, index) of model.cardTextList"
        :key="index"
        class="md-layout md-gutter"
      >
        <div class="md-layout-item md-small-size-100">
          <md-field :class="messageClass">
            <label>Front text (Korean)</label>
            <md-textarea
              v-model="cardText.front"
              class="te"
              :required="true"
              :md-counter="values.limit.textareaCount"
              :maxlength="values.limit.textareaCount"
            />
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100">
          <md-field :class="messageClass">
            <label>Front text (Korean)</label>
            <md-textarea
              v-model="cardText.real"
              :required="true"
              :md-counter="values.limit.textareaCount"
              :maxlength="values.limit.textareaCount"
            />
          </md-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardGroupForms',
  props: {
    groupName: { type: String, default: '' },
    cardTextList: { type: Array, default: () => [] },
  },
  data() {
    return {
      model: {
        cardTextList: this.cardTextList,
        groupName: this.groupName,
        isInvalid: true,
      },
      values: {
        limit: {
          textareaCount: 150,
        }
      },
    }
  },
  computed: {
    messageClass() {
      return { 'md-invalid': this.model.isInvalid }
    },
  },
  methods: {
    createCardText() {
      return { front: '', real: '' }
    },
    addCard() {
      this.model.cardTextList.splice(0, 0, this.createCardText())
    },
  },
}
</script>

<style lang="scss" scoped>
.te {
  height: 1rem;
}
</style>
