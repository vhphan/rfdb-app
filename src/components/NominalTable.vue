<template>
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
import TestDialog from "./TestDialog.vue";
import {showError} from "../utils/myFunctions.js";

export default {
  name: "NominalTable",
  components: {RfTable},

  setup: function (props) {
    const $q = useQuasar()
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
    const showDialog = function (row) {
      $q.dialog({
        component: TestDialog,

        // props forwarded to your custom component
        componentProps: {
          text: 'something',
          row
        }
      }).onOk(() => {
        console.log('OK')
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      })
    }

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
    const rowContextMenu = [
      {
        label: "Edit Row",
        action: function (e, row) {
          console.log(e);
          console.log(row);
          console.log(row.getData());
          showDialog(row.getData());
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