import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ClientDetail from '../views/AboutView.vue'
import ProviderList from '@/views/ProviderView.vue'
import ProviderDetail from '@/views/ProviderDetail'
import LoginAuth from '@/views/LoginAuth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/client',
    name: 'clientDetail',
    component: ClientDetail
  },
  

  {
    path: '/provider',

    name: 'providerlist',
    component: ProviderList
  },
  {
    path: '/provider/detail',
    name: 'providerDetail',
    component: ProviderDetail
  },
  {
    path: '/login',
    name: 'login',
    component: LoginAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
