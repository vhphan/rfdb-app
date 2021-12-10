<template>
  <rf-table table-name="candidates_view"
            :table-filters-list="tableFiltersList"
            table-id="candidates"
            bool-operand="OR"
            :add-table-options="addTableOptions"
  />
</template>
<script>
import RfTable from "./RFTable.vue"
import {useStore} from "vuex";
import {computed, reactive, ref} from "vue";
import UpdateTableDialog from "./UpdateTableDialog.vue";
import {useQuasar} from "quasar";

export default {
  name: 'CandidatesTable',
  components: {RfTable},
  setup() {
    const store = useStore();
    const $q = useQuasar();
    const nominalIdList = computed(() => store.state.rfdb.nominalIdList);
    const tableFiltersList = computed(() => {
      return nominalIdList.value.map(nominalId => {
        return {
          'Nominal ID': nominalId,
        }
      })
    });
    const showDialog = function (row) {
      $q.dialog({
        component: UpdateTableDialog,

        // props forwarded to your custom component
        componentProps: {
          text: 'something',
          row,
          url: '/updateCandidates',
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
          showDialog(row.getData());
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
