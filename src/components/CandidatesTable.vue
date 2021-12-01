<template>
  <rf-table table-name="candidates_view"
            :table-filters-list="tableFiltersList"
            table-id="candidates"
            bool-operand="OR"
  />
</template>
<script>
import RfTable from "./RFTable.vue"
import {useStore} from "vuex";
import {computed, ref} from "vue";

export default {
  name: 'CandidatesTable',
  components: {RfTable},
  setup() {
    const store = useStore();
    const nominalIdList = computed(() => store.state.rfdb.nominalIdList);
    const tableFiltersList = computed(() => {
      return nominalIdList.value.map(nominalId => {
        return {
          'Nominal ID': nominalId,
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
