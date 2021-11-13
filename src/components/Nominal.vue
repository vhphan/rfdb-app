<template>
  <div ref="table">
  </div>
</template>

<script>
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import {ref, computed, onMounted, watch} from "vue";
import keys from "../private/keys";


export default {
  name: "nominal",
  props: {
    tableName: {type: String, default: 'nominal_view'}
  },
  setup: function (props) {

    const table = ref(null);
    let tabulator = ref(null);
    const href = `https://ndo-portal.eprojecttrackers.com/main.php?action=tabulatorPG&table=${props.tableName}&view=1`;
    const tableOptions = {
      reactiveData:true,
      persistence: {
        filter: true, //persist filter
        sort: true, //persist filter
      },
      ajaxSorting: true,
      ajaxURL: href,
      ajaxConfig: {
        // method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=utf-8',
          'X-Requested-With': 'XMLHttpRequest',
          'API': keys['apiKey']
        },
      },
      ajaxError: function (xhr, textStatus, errorThrown) {
        alert('You may be logged out.', 'danger');
      },
      ajaxFiltering: true,
      ajaxResponse: function (url, params, response) {
        //url - the URL of the request
        //params - the parameters passed with the request
        //response - the JSON object returned in the body of the response.
        console.log(this.getSorters());
        return response; //return the response data to tabulator
      },
      autoResize: false,
      pagination: true,
      paginationMode: 'remote',
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
      renderComplete: function () {
        // setFilters(this);
      },
      renderStarted: function () {
      },
      dataFiltered: function (filters, rows) {
        //filters - array of filters currently applied
        // const headerFilters = this.getHeaderFilters();
        // let filterText = headerFilters.map(h => {
        //   const {field, type, value} = h;
        //   return `${field} ${type} ${value}`;
        // }).join(', ');
        // i;
        // if (filterText.trim() === '') filterText = 'NONE';
        // document.getElementById('tabulator-info-text').innerText = 'FILTER := ' + filterText;
      },
    };

    onMounted(() => {
      tabulator.value = new Tabulator(table.value, tableOptions);
    })

    return {
      table,
      tabulator,
      tableOptions,
    }
  }
}
</script>

<style>
</style>
