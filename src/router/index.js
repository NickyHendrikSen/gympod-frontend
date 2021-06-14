import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '@/views/login/Login.vue';
import DashboardView from '@/views/dashboard/Dashboard.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
