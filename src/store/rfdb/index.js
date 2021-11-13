import {api} from '../../plugins/http';

export default {
    namespaced: true,
    state: {
        nominal: [],
    },
    getters: {},
    mutations: {},
    actions: {
        getNominalData: () => {
            console.log(api);
        }
    }
}
