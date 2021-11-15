<template>
  <div ref="table">
  </div>
</template>

<script>
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import {ref, computed, onMounted, watch} from "vue";
import keys from "../private/keys";
import {useStore} from "vuex";


export default {
  name: "rfTable",
  props: {
    tableName: {type: String, required: true},
  },
  setup: function (props) {
    const store = useStore();
    const table = ref(null);
    let tabulator = ref(null);
    const href = `https://ndo-portal.eprojecttrackers.com/main.php?action=tabulatorPG&table=${props.tableName}&view=1`;
    const tableOptions = {
      reactiveData: true,
      // persistence: {
      //   filter: true, //persist filter
      //   sort: true, //persist filter
      // },
      ajaxURL: href,
      ajaxConfig: {
        // method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=utf-8',
          'X-Requested-With': 'XMLHttpRequest',
          'API': keys['apiKey']
        },
      },
      sortMode:"remote",
      filterMode:"remote",
      // ajaxResponse: function (url, params, response) {
      //   //url - the URL of the request
      //   //params - the parameters passed with the request
      //   //response - the JSON object returned in the body of the response.
      //   return response; //return the response data to tabulator
      // },
      autoResize: false,
      pagination: true,
      paginationMode: 'remote',
      paginationSize: 100,
      paginationInitialPage:   1,
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
      tabulator.value.on("rowClick", function (e, row) {
        //e - the click event object
        //row - row component
        const rowData = row.getData();
        if ('nominal_id' in rowData) {
          store.dispatch('rfdb/setNominalId', rowData['nominal_id']);
        }
      });
    })

    // watch(()=>props.tableFilters, (newObj, oldObj)=>{
    //   console.log(newObj);
    //   console.log(oldObj);
    // }, {deep: true})

    return {
      table,
      tabulator,
      tableOptions,
    }
  }
}
</script>

<style>
.tabulator{
  font-size: 13px !important;
}
</style>
