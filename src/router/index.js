import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router';
import NominalTable from "../components/NominalTable.vue";
import CandidatesTable from "../components/CandidatesTable.vue";
import ConfigsTable from "../components/ConfigsTable.vue";
import ChangeLogTable from "../components/ChangeLogTable.vue";



const routes = [
    {
        path: '/app/rfdb/', redirect: {name: 'Configs'},
        name: 'Home',
    }, {
        path: '/app/rfdb/nominal/configs',
        name: 'Configs',
        components: {
            left: NominalTable,
            right: ConfigsTable
        }
    },
    {
        path: '/app/rfdb/nominal/candidates',
        name: 'Candidates',
        components: {
            left: NominalTable,
            right: CandidatesTable
        }
    },
    {
        path: '/app/rfdb/nominal/change',
        name: 'ChangeLogs',
        components: {
            left: NominalTable,
            right: ChangeLogTable
        }
    },
]

const router = createRouter({
    base: '/app/rfdb/',
    history: createWebHistory(),
    mode: 'history',
    routes,
})


export default router