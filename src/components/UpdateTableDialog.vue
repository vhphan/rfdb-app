<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onDialogHide">

    <q-card class="q-dialog-plugin q-pa-md" style="max-width:1500px; width:1000px;">
      <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md "

      >
        <div class="row">
          <div v-for="column in columnList" class="q-ma-xs q-pa-xs">
            <q-input
                class=""
                outlined
                v-model="formData[column]"
                :label=column
                :disable="!isEditable(column)"
            />
          </div>
        </div>
        <div>
          <q-btn class="q-ma-xs" label="Submit" type="submit" color="primary"/>

          <!--          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>-->
        </div>
        <div>
          <!--          <q-btn class="q-ma-xs" color="secondary" label="Ok" @click="onOKClick"/>-->
          <q-btn class="q-ma-xs" color="secondary" label="CLOSE" @click="onCancelClick"/>
        </div>
      </q-form>

      <q-card-section>
        {{ formData }}
      </q-card-section>

      <!-- buttons example -->
      <q-card-actions align="right">
        <!--        <q-btn color="primary" label="OK" @click="onOKClick"/>-->
      </q-card-actions>
    </q-card>

  </q-dialog>
</template>

<script>
import {useDialogPluginComponent, useQuasar} from 'quasar'
import {onMounted, reactive, ref} from "vue";
import {apiNode} from "../plugins/http";

export default {
  name: 'UpdateTableDialog',
  props: {
    rowData: {
      type: Object,
      required: false,
      default: {}
    },
    tableRef: {
      type: Object,
      required: false,
      default: null
    },
    url: {
      type: String,
      required: true
    },
    editableColumns: {
      type: Array,
      required: true
    },
  },

  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits
  ],

  setup: function (props) {
    const $q = useQuasar();
    // REQUIRED; must be called inside of setup()
    const {dialogRef, onDialogHide, onDialogOK, onDialogCancel} = useDialogPluginComponent()
    // dialogRef      - Vue ref to be applied to QDialog
    // onDialogHide   - Function to be used as handler for @hide on QDialog
    // onDialogOK     - Function to call to settle dialog with "ok" outcome
    //                    example: onDialogOK() - no payload
    //                    example: onDialogOK({ /*.../* }) - with payload
    // onDialogCancel - Function to call to settle dialog with "cancel" outcome

    const name = ref('')


    const {rowData} = props;
    const formData = reactive(rowData);
    const columnList = ref([]);
    //0: 'dnb_index', 1: 'nominal_siteid', 2: 'nominal_id', 3: 'rf_pic', 4: 'active_model', 5: 'morphology', 6: 'nominal_latitude', 7: 'nominal_longitude', 8: 'phase_deployment', 9: 'phase_commercial', 10: 'nominal_change_log', 11: 'District', 12: 'State
    // [
    //   'AntModel',
    //   'AntHeight',
    //   'AntDirection',
    //   'AntEtilt',
    //   'AntMtilt',
    // ];
    const editableColumnList = props.editableColumns;
    const isEditable = (column) => editableColumnList.includes(column)
    const onSubmit = async () => {
      console.log('submit');
      console.log(formData);
      try {
        const result = (await apiNode.put(props.url, formData)).data;
        //  {"result":"success"}
        if (result['result'] === 'success') {
          $q.notify({
            message: JSON.stringify(result),
            color: 'green'
          });
          return;
        }
        if (props.tableRef) props.tableRef.setData();
      } catch (e) {
        $q.notify({
          message: `ERROR updating! ${e.message}`,
          color: 'red'
        });
      }
      $q.notify({
        message: JSON.stringify(result),
        color: 'red'
      });
    };

    const onReset = () => {
      name.value = null
    }
    onMounted(() => {
      for (const [key, value] of Object.entries(rowData)) {
        columnList.value.push(key);
      }
    })
    return {
      // This is REQUIRED;
      // Need to inject these (from useDialogPluginComponent() call)
      // into the vue scope for the vue html template
      dialogRef,
      onDialogHide,

      // other methods that we used in our vue html template;
      // these are part of our example (so not required)
      onOKClick() {
        // on OK, it is REQUIRED to
        // call onDialogOK (with optional payload)
        onDialogOK()
        // or with payload: onDialogOK({ ... })
        // ...and it will also hide the dialog automatically
      },

      // we can passthrough onDialogCancel directly
      onCancelClick: onDialogCancel,

      formData,
      onSubmit,
      onReset,
      columnList,
      isEditable
    }

  }
}
</script>