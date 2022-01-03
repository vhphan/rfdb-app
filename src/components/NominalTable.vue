<template>
  <q-card style="display: inline-block;" class="q-pa-xs q-mx-xs bg-primary" bordered>
    <q-btn class="bg-white q-mx-xs">
      <a href="https://ndo-portal.eprojecttrackers.com/query_to_zip.php?queryName=rfdb_nominal">
        EXPORT CSV
      </a>
    </q-btn>
  </q-card>
  <q-card style="display: inline-block;" class="q-pa-xs q-mx-xs bg-primary" bordered>
    <q-btn class="bg-white q-mx-xs">
      <a target="_blank"
         href="https://ndo-portal.eprojecttrackers.com/import.php?table=rf_nominal">
        IMPORT UPDATE
      </a>
    </q-btn>
    <q-btn class="bg-white q-mx-xs">
      <a target="_blank"
         href="https://ndo-portal.eprojecttrackers.com/query_to_zip.php?queryName=update_nominal_sample">
        SAMPLE FILE
      </a>
    </q-btn>
  </q-card>
  <q-card style="display: inline-block;" class="q-pa-xs q-mx-xs bg-primary" bordered>
    <q-btn class="bg-white q-mx-xs">CLEAR SELECTED ROWS</q-btn>
  </q-card>
  <rf-table
      table-name="nominal_view"
      table-id="nominal"
      :row-click-func="rowClickFunc"
      :row-selection-changed-function="rowSelectFunc"
      :ajax-response-function="ajaxResponseFunction"
      :add-table-options="addTableOptions"
  />
</template>

<script>
import RfTable from "./RFTable.vue";
import {useStore} from "vuex";
import {onMounted, reactive, ref} from "vue";
import {useQuasar} from "quasar";
import {showError} from "../utils/myFunctions.js";
import UpdateTableDialog from "./UpdateTableDialog.vue";

export default {
  name: "NominalTable",
  components: {RfTable},

  setup: function (props) {
    const $q = useQuasar();
    const store = useStore();
    const rowClickFunc = function (e, row) {
      //e - the click event object
      //row - row component
      const rowData = row.getData();
      if ('nominal_id' in rowData) {
        store.dispatch('rfdb/setNominalId', rowData['nominal_id']);
      }
    }
    const rowSelectFunc = function (d, r) {
      const nominalIdList = d.map(data => data['nominal_id'])
      store.dispatch('rfdb/setNominalIdList', nominalIdList);
    };
    onMounted(() => {
    })
    const ajaxResponseFunction = function (url, params, response) {
      //url - the URL of the request
      //params - the parameters passed with the request
      //response - the JSON object returned in the body of the response.

      // 1. filter geom
      console.log(response);
      try {
        if (!'data' in response) {
          showError('Network response no data')
          return {data: [], last_page: 1}
        }

        response.data.forEach(d => {
              if ('geom' in d) delete d['geom'];
              // d['action'] = d['nominal_id'];
            }
        );

      } catch (e) {
        console.log(e);
      }
      return response; //return the response data to tabulator
    }
    const columnOptions = ref([{
      field: 'action',
      formatter: function (cell, formatterParams) {
        let nominalId = cell.getValue();
        return `<button>${nominalId}</button>`
      }
    }]);
    const openForm = (rowData) => {
      const getString = new URLSearchParams(rowData).toString();
      window.open("/update.html?" + (getString));
    }

    const showDialog = function (row) {
      const rowData = row.getData();
      const tableRef = row._row.table;
      $q.dialog({
        component: UpdateTableDialog,

        // props forwarded to your custom component
        componentProps: {
          rowData,
          tableRef,
          url: '/updateNominal',
          editableColumns: [
            'nominal_siteid',
            'rf_pic',
            'active_model',
            'nominal_longitude',
            'nominal_latitude',
            'phase_deployment',
            'phase_commercial',
          ]
        }
      }).onOk(() => {
        console.log('OK')
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      })
    };
    const rowContextMenu = [
      {
        label: "Edit Row",
        action: function (e, row) {
          console.log(e);
          console.log(row);
          console.log(row._row.table);
          console.log(row.getData());
          showDialog(row);
          // const rowData = row.getData();
          // openForm(rowData);
        }
      }, {
        label: "Clear All Selected Rows",
        action: function (e, row) {
          row._row.table.deselectRow();
          // const rowData = row.getData();
          // openForm(rowData);
        }
      },
    ];
    const addTableOptions = reactive({
      rowContextMenu
    })

    return {
      rowClickFunc,
      rowSelectFunc,
      ajaxResponseFunction,
      columnOptions,
      addTableOptions
    }
  }
}

</script>

<style scoped>

</style>