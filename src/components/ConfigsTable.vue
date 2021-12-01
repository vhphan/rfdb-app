<template>
  <rf-table table-name="config_view"
            :table-filters-list="tableFiltersList"
            table-id="config"
            bool-operand="OR"
  />
</template>
<script>
import RfTable from "./RFTable.vue"
import {useStore} from "vuex";
import {computed, ref} from "vue";

export default {
  name: 'ConfigTable',
  components: {RfTable},
  setup() {
    const store = useStore();
    const nominalIdList = computed(() => store.state.rfdb.nominalIdList);

    const tableFiltersList = computed(() => {
      return nominalIdList.value.map(nominalId => {
        return {
          'nominal_id': nominalId,
        }
      })
    });


    return {
      tableFiltersList,
      nominalIdList
    }
  }
}
</script>
