<template>
<q-btn><a href="https://ndo-portal.eprojecttrackers.com/query_to_zip.php?queryName=rfdb_candidates">EXPORT CSV</a>
  </q-btn>

  <rf-table table-name="change_log"
            table-id="changeLog"
            :add-table-options="tableOptions"
  />
</template>

<script>
import RfTable from "./RFTable";
import {reactive} from "vue";
import {BASE_URL_NODE} from "../plugins/http";
export default {
  name: "ChangeLogTable",
  components: {RfTable},
  setup(){
    const tableOptions = reactive({
      ajaxURL:`${BASE_URL_NODE}/changeLog`
    })
    return {
      tableOptions
    }
  }
}
</script>

<style scoped>

</style>