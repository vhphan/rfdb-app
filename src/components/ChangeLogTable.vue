<template>
  <q-btn><a href="https://ndo-portal.eprojecttrackers.com/query_to_zip.php?queryName=rfdb_candidates">EXPORT CSV</a>
  </q-btn>

  <rf-table table-name="t_history_parsed"
            table-id="history"
            schema="logging"
  />
</template>

<script>
import RfTable from "./RFTable.vue";

export default {
  name: "ChangeLogTable",
  components: {RfTable},
  setup() {
  }
}
</script>

<style scoped>

</style>