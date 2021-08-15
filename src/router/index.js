// eslint-disable-next-line prettier/prettier
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CardManagement from '../views/CardManagement.vue'
import CardListPage from '../views/CardListPage.vue'
import CardGroupForm from '../components/forms/CardGroupForms.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/card-management',
    component: CardManagement,
    children: [
      {
        path: '/',
        name: 'card-list',
        component: CardListPage,
      },
      {
        path: '/edit',
        component: CardGroupForm,
      },
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
