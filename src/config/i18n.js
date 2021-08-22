import Vue from 'vue'
import VueI18n from 'vue-i18n'
import ko from './_ko.json'
import en from './_en.json'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'ko',
  fallbackLocale: 'ko',
  messages: { ko, en }
})
