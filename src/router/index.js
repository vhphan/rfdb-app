import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue';
import Nominal from '../components/Nominal.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  }, {
    path: '/nominal',
    name: 'Nominal',
    component: Nominal,
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router