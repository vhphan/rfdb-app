<template>
  <q-card style="display: inline-block;" class="q-pa-xs q-mx-xs bg-primary" bordered>
    <q-btn class="bg-white q-mx-xs">
      <a href="https://ndo-portal.eprojecttrackers.com/query_to_zip.php?queryName=rfdb_config">
        EXPORT CSV
      </a>
    </q-btn>
  </q-card>
  <q-card style="display: inline-block;" class="q-pa-xs q-mx-xs bg-primary" bordered>
    <q-btn class="bg-white q-mx-xs">
      <a target="_blank"
         href="https://ndo-portal.eprojecttrackers.com/import.php?table=myesite_SectorLevelData">
        IMPORT UPDATE
      </a>
    </q-btn>
    <q-btn class="bg-white q-mx-xs">
      <a target="_blank"
         href="https://ndo-portal.eprojecttrackers.com/query_to_zip.php?queryName=update_config_sample">
        SAMPLE FILE
      </a>
    </q-btn>
  </q-card>
  <rf-table table-name="config_view"
            :table-filters-list="tableFiltersList"
            table-id="config"
            bool-operand="OR"
            :add-table-options="addTableOptions"
  />
</template>
<script>
import RfTable from "./RFTable.vue"
import {useStore} from "vuex";
import {computed, reactive, ref} from "vue";
import {useQuasar} from "quasar";
import UpdateTableDialog from "./UpdateTableDialog.vue";

export default {
  name: 'ConfigsTable',
  components: {RfTable},
  setup() {
    const store = useStore();
    const $q = useQuasar();
    const nominalIdList = computed(() => store.state.rfdb.nominalIdList);
    const tableFiltersList = computed(() => {
      return nominalIdList.value.map(nominalId => {
        return {
          'nominal_id': nominalId,
        }
      })
    });
    const showDialog = function (row) {
      const rowData = row.getData();
      console.log(row);
      console.log(row.getData());
      const tableRef = row._row.table;
      $q.dialog({
        component: UpdateTableDialog,

        // props forwarded to your custom component
        componentProps: {
          rowData,
          tableRef,
          url: '/updateConfigs',
          editableColumns: [
            'AntModel',
            'AntHeight',
            'AntDirection',
            'AntEtilt',
            'AntMtilt',
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
          console.log(row.getData());
          showDialog(row);
          // const rowData = row.getData();
          // openForm(rowData);
        }
      },
    ];
    const addTableOptions = reactive({
      rowContextMenu
    })
    return {
      tableFiltersList,
      nominalIdList,
      addTableOptions
    }
  }
}
</script>