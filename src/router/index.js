import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue';
import NominalTable from "../components/NominalTable.vue";
const routes = [
  {
    path: '/',
    name: 'Nominal',
    component: NominalTable,
  }, {
    path: '/nominal',
    name: 'Nominal',
    component: NominalTable,
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router