<template>
  <div>
    <p>{{ tableFiltersList }}</p>
    <div ref="table" :id="tableId" key="tableId">
    </div>
  </div>
</template>

<script>
import Tabulator from 'tabulator-tables';
import {computed, onMounted, ref, watch} from "vue";
import {useStore} from "vuex";
import {useQuasar} from "quasar";


export default {
  name: "simpleTable",
  props: {
    tableName: {type: String, required: true},
    tableId: {type: String, required: true},
    columnOptions: {
      type: Array,
      default: [],
      required: false
    },
    addTableOptions: {
      type: Object,
      default: {},
      required: false
    },
    ajaxUrl: {
      type: String,
      default: '',
      required: false
    },
  },
  setup: function (props) {
    const table = ref(null);
    let tabulator = ref(null);
    let tableRendered = ref(false);
    let ajaxHalted = ref(false);
    const filters = computed(() => tabulator.value.getFilters())
    const $q = useQuasar()

    const tableOptions = {
      selectable: true,
      rowSelectionChanged: props.rowSelectionChangedFunction,
      rowClick: props.rowClickFunc,
      reactiveData: true,
      persistence: {
        sort: true, //persist filter
      },
      ajaxURL: props.ajaxUrl,
      ajaxConfig: {
        // method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=utf-8',
          'X-Requested-With': 'XMLHttpRequest',
          'API': import.meta.env.VITE_API_KEY
        },
      },

      ajaxResponse: props.ajaxResponseFunction ||
          function (url, params, response) {
            //url - the URL of the request
            //params - the parameters passed with the request
            //response - the JSON object returned in the body of the response.
            console.log(props.tableId, tabulator.value.getSorters());
            console.log(props.tableId, tabulator.value.getFilters());
            console.log(`${props.tableId}, ajax completed`);
            return response; //return the response data to tabulator
          },
      // sortMode: "remote", //5.0
      // filterMode: "remote", //5.0
      ajaxSorting: true, //4.9
      ajaxFiltering: true, //4.9

      ajaxRequesting: function (url, params) {
        // return false; //abort ajax request
        if (tabulator.value === null && props.tableFiltersList.length > 0) {
          console.log(`${props.tableId} ajax halted`);
          ajaxHalted.value = true;
          return false;
        } else {
          console.log(`${props.tableId} ajax NOT halted`);
          return true;
        }
      },

      renderComplete: function () {
        console.log(`${props.tableId} renderComplete`);
        if (!tableRendered.value) {
          tableRendered.value = true;
        }
      },
      autoResize: false,
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

          if (typeof props.columnOptions.filter === 'function' && props.columnOptions.length > 0) {
            const columnOption = props.columnOptions.filter(option => option.field === column.field);
            if (columnOption.length > 0) {
              for (let [key, value] of Object.entries(columnOption[0])) {
                if (key !== 'field') {
                  column[key] = value;
                }
              }
              console.log(column);
            }
          }
        });

        return definitions;
      },
      maxHeight: '80vh',
      ...props.addTableOptions

    };

    onMounted(() => {
      tabulator.value = new Tabulator(`#${props.tableId}`, tableOptions);
      if (ajaxHalted.value && props.tableFiltersList.length > 0) {
        console.log('trying to render with filtered list after ajax halted');
        setFilters(props.tableFiltersList);
      }
      //ver 5
      // tabulator.value.on("rowClick", rowClickFunc);
    })


    function setFilters(newList) {
      console.log(newList);
      if (newList.length === 0) {
        tabulator.value.clearFilter(true);
        $q.notify({
          message: 'Filtered Cleared.',
          color: 'green'
        });
        return;
      }
      let filterList = [];
      newList.forEach(obj => {
        for (const [key, value] of Object.entries(obj)) {
          filterList.push({
            field: key,
            type: 'like',
            value: value
          })
        }
      });
      tabulator.value.setFilter(filterList);
      $q.notify({
        message: `${props.tableId} : Filters Applied.`,
        color: 'green'
      })
    }


    watch(() => props.tableFiltersList, (newList) => {
      console.log(`${props.tableId} tableFiltersList watcher called`);
      setFilters(newList);
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
