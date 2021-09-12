// eslint-disable-next-line prettier/prettier
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import CardManagement from '../views/CardManagement.vue'
import CardGroupListPage from '../views/CardGroupListPage.vue'
import CardGroupForm from '../components/forms/CardGroupForms.vue'
import authService from '@services/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      allowNotAuthenticated: true
    },
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
    meta: { requiresAuth: true },
    children: [
      {
        path: '/',
        name: 'card-list',
        component: CardGroupListPage,
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.allowNotAuthenticated)) {
    console.log('pass /login')
    next()
  } else {
    if (authService.isAuthenticated()) {
      next()
    } else {
      console.log('redirect to /login')
      next({ name: 'Login' })
    }
  }
})

export default router
