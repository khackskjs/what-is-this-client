import Vue from 'vue'

/*** for BootstrapVue ***/
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


/*** Vue Material ***/
/**
 * Alignments 등 https://www.creative-tim.com/vuematerial/ui-elements/layout
 */
import {
  MdButton,
  MdContent,
  MdField,
  MdIcon,
  MdList,
  MdDivider,
  MdAvatar,
  MdDialog,
  MdTabs,
  MdEmptyState,
} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/black-green-dark.css'
import 'vue-material/dist/theme/black-green-light.css'
// import 'vue-material/dist/theme/default.css'
// import 'vue-material/dist/theme/default-dark.css'

Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdField)
Vue.use(MdIcon)
Vue.use(MdList)
Vue.use(MdDivider)
Vue.use(MdAvatar)
Vue.use(MdDialog)
Vue.use(MdTabs)
Vue.use(MdEmptyState)
