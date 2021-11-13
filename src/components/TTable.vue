<template>
<div ref="table"></div>
</template>

<script>
export default {
  name: "TTable",
  props: [
    {
      tableData: {required:true},
      tableOptions: {required:true},
    }
  ],
  data: function () {
    return {
      tabulator: null, //variable to hold your table
    }
  },
  watch:{
    //update table if data changes
    tableData:{
      handler: function (newData) {
        this.tabulator.replaceData(newData);
      },
      deep: true,
    }
  },
  mounted(){
    //instantiate Tabulator when element is mounted
    this.tabulator = new Tabulator(this.$refs.table, {
      data: this.tableData, //link data to table
      reactiveData:true, //enable data reactivity
      columns: [], //define table columns
    });
  },
}
</script>

<style scoped>

</style>