import {api} from '../../plugins/http';

export default {
    namespaced: true,
    state: {
        nominal: [],
        nominalId: null,
        mainTable: null,
    },
    getters: {},
    mutations: {
        setCurrentTable: (state, value)=> {
            state.mainTable = value;
        },
        setNominalId: (state, value)=> {
            state.nominalId = value;
        },

    },
    actions: {
        getNominalData: () => {
            console.log(api);
        },
        setCurrentTable: ({commit}, value) => {
            commit('setCurrentTable', value);
        },
        setNominalId: ({commit}, value) => {
            commit('setNominalId', value);
        }
    }
}
