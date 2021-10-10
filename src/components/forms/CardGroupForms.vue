<template>
  <div style="padding: 1rem">
    <div class="container-fluid">
      <div class="md-layout">
        <md-field>
          <label>Group Name</label>
          <md-input
            ref="groupNameComp"
            v-model="model.groupName"
            tabindex="1"
            @input="$emit('update:group-name', $event)"
          />
        </md-field>
      </div>
      <div class="md-layout">
        <md-field>
          <label>{{ $t('card_group_form_study_date_count_title') }}</label>
          <md-input
            v-model="model.baseDate"
            tabindex="2"
          />
        </md-field>
      </div>
      
      <div class="md-layout">
        <md-button
          class="md-raised md-primary"
          :tabindex="model.cardTextList.length * 10 + 3"
          @click="addCard"
        >
          {{ $t('card_group_form__card_add_button_title') }}
        </md-button>
        <!-- <md-button
          class="md-raised md-primary"
          @click="deleteCard"
        >
          {{ $t('card_group_form__card_delete_button_title') }}
        </md-button> -->
      </div>
      <div
        v-for="(cardText, index) of model.cardTextList"
        :key="index"
        ref="cardlistComp"
        class="md-layout md-gutter"
      >
        <div class="md-layout-item md-small-size-100">
          <md-field :class="messageClass">
            <label>Front text (Korean)</label>
            <md-textarea
              v-model="cardText.text1"
              class="te"
              :required="true"
              :tabindex="(model.cardTextList.length - index) * 10 + 1"
              :md-counter="values.limit.textareaCount"
              :maxlength="values.limit.textareaCount"
            />
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100">
          <md-field :class="messageClass">
            <label>Real text (English)</label>
            <md-textarea
              v-model="cardText.text2"
              :required="true"
              :tabindex="(model.cardTextList.length - index) * 10 + 2"
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
    guid: { type: Number, default: 0 },
    groupName: { type: String, default: '' },
    baseDate: { type: Number, default: 1 },
    cardTextList: { type: Array, default: () => [] },
  },
  data() {
    return {
      model: {
        groupName: this.groupName,
        baseDate: this.baseDate,
        cardTextList: this.cardTextList,
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
  mounted() {
    setTimeout(() => {
      this.$refs.groupNameComp.$el.focus()
    }, 100)
  },
  methods: {
    createCardText() {
      return { text1: '', text2: '' }
    },
    addCard() {
      this.model.cardTextList.splice(0, 0, this.createCardText())
      if (this.$refs.cardlistComp && this.$refs.cardlistComp[0]) {
        const el = this.$refs.cardlistComp[0].querySelector('textarea')
        if (el) {
          el.focus()
        }
      }
    },
    deleteCard() {
    }
  },
}
</script>

<style lang="scss" scoped>
.te {
  height: 1rem;
}
</style>
