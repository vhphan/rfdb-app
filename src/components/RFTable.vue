<template>
  <div ref="table">
  </div>
</template>

<script>
import Tabulator from 'tabulator-tables';
import {computed, onMounted, ref, watch} from "vue";
import keys from "../private/keys";
import {useStore} from "vuex";


export default {
  name: "rfTable",
  props: {
    tableName: {type: String, required: true},
    tableFilters: {type: Object, required: false, default: {}},
  },
  setup: function (props) {
    const store = useStore();
    const table = ref(null);
    let tabulator = ref(null);
    const filters = computed(()=>tabulator.value.getFilters())
    const href = `https://ndo-portal.eprojecttrackers.com/main.php?action=tabulatorPG&table=${props.tableName}&view=1`;

    const rowClickFunc = function (e, row) {
      //e - the click event object
      //row - row component
      const rowData = row.getData();
      if ('nominal_id' in rowData) {
        store.dispatch('rfdb/setNominalId', rowData['nominal_id']);
      }
    }
    const tableOptions = {
      rowClick: rowClickFunc,
      reactiveData: true,
      persistence: {
        filter: true, //persist filter
        sort: true, //persist filter
      },
      ajaxURL: href,
      ajaxConfig: {
        // method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=utf-8',
          'X-Requested-With': 'XMLHttpRequest',
          'API': keys['apiKey']
        },
      },
      renderComplete: function () {
        console.log('renderComplete');
      },
      ajaxResponse: function (url, params, response) {
        //url - the URL of the request
        //params - the parameters passed with the request
        //response - the JSON object returned in the body of the response.
        console.log(tabulator.value.getSorters());
        console.log(tabulator.value.getFilters());
        return response; //return the response data to tabulator
      },
      // sortMode: "remote", //5.0
      // filterMode: "remote", //5.0
      ajaxSorting: true, //4.9
      ajaxFiltering: true, //4.9

      // ajaxResponse: function (url, params, response) {
      //   //url - the URL of the request
      //   //params - the parameters passed with the request
      //   //response - the JSON object returned in the body of the response.
      //   return response; //return the response data to tabulator
      // },
      autoResize: false,
      pagination: 'remote', //4.9
      // pagination: true, //5.0
      // paginationMode: 'remote', //5.0
      paginationSize: 100,
      paginationInitialPage: 1,
      autoColumns: true,
      autoColumnsDefinitions: function (definitions) {
        //definitions - array of column definition objects
        definitions.forEach((column) => {
          column.headerFilter = true; // add header filter to every column
          column.headerFilterLiveFilter = false;
        });

        return definitions;
      },
      maxHeight: '90vh',


    };

    onMounted(() => {
      tabulator.value = new Tabulator(table.value, tableOptions);

      //ver 5
      // tabulator.value.on("rowClick", rowClickFunc);
    })

    watch(()=>props.tableFilters, (newObj, oldObj)=>{
      console.log(newObj);
      console.log(oldObj);
      let filterList = [];
      for (const [key, value] of Object.entries(newObj)) {
        filterList.push({
          field: key,
          type: 'like',
          value: value
        })
      }
      tabulator.value.setFilter(filterList);
    }, {deep: true})

    return {
      table,
      tabulator,
      tableOptions,
      filters,
    }
  }
}
</script>

<style>
.tabulator {
  font-size: 13px !important;
}
</style>
