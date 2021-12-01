import {api} from '../../plugins/http';

export default {
    namespaced: true,
    state: {
        nominal: [],
        nominalId: null,
        nominalIdList: [],
        mainTable: null,
        containerSize: null,
    },
    getters: {},
    mutations: {
        setCurrentTable: (state, value)=> {
            state.mainTable = value;
        },
        setNominalId: (state, value)=> {
            state.nominalId = value;
        },
        setNominalIdList: (state, value)=> {
            state.nominalIdList = value;
        },
        setContainerSize: (state, value)=> {
            state.containerSize = value;
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
        },
        setNominalIdList: ({commit}, value) => {
            commit('setNominalIdList', value);
        },
        setContainerSize: ({commit}, value) => {
            commit('setContainerSize', value);
        },
    }
}
