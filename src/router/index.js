import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '@/views/login/Login.vue';
import DashboardView from '@/views/dashboard/Dashboard.vue';
import DetailView from '@/views/detail/Detail.vue';

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
  {
    path: '/Detail',
    name: 'Detail',
    component: DetailView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
