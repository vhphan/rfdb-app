import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue';
import rfTable from '../components/RFTable.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  }, {
    path: '/nominal',
    name: 'Nominal',
    component: rfTable,
    props: {tableName: 'nominal_view'}
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router