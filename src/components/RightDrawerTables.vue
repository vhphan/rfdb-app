<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 600px">


      <q-card>


        <q-tabs
            v-model="tab"
            dense
            class="bg-grey-3"
            align="justify"
            narrow-indicator
        >
          <q-tab name="candidates" label="Candidates"/>
          <q-tab name="configs" label="Configs"/>
          <q-tab name="map" label="Map"/>
        </q-tabs>
        <q-separator/>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="candidates">
            <div class="text-h6">Candidates</div>
            <rf-table table-name="candidates_view" :table-filters="tableFilters" />
          </q-tab-panel>

          <q-tab-panel name="configs">
            <div class="text-h6">Configs</div>
          </q-tab-panel>

          <q-tab-panel name="map">
            <div class="text-h6">Map</div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
import {computed, reactive, ref} from "vue";
import RfTable from "./RFTable.vue";
import {useStore} from "vuex";

export default {
  name: "RightDrawerTables",
  components: {RfTable},
  setup() {
    const store = useStore();
    const nominalId = computed(() => store.state.rfdb.nominalId).value;
    const tableFilters = computed(() => {
      return {
        'Nominal ID': store.state.rfdb.nominalId,
      }
    });
    return {
      tab: ref('candidates'),
      tableFilters,
    }
  }
}
</script>

<style scoped>

</style>