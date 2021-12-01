<template>
  <div class="q-pa-xs">
    <div class="q-gutter-y-md">
        <q-tabs
            v-model="tab"
            dense
            align="left"
            narrow-indicator
            class="bg-primary text-white shadow-2"
            :breakpoint="0"
        >
          <q-tab name="candidates" label="Candidates"/>
          <q-tab name="configs" label="Configs"/>
          <q-tab name="map" label="Map"/>
        </q-tabs>
        <q-separator/>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="candidates">
            <CandidatesTable/>
          </q-tab-panel>

          <q-tab-panel name="configs">
            <ConfigTable/>
          </q-tab-panel>

          <q-tab-panel name="map">
            <div class="text-h6">Map</div>
          </q-tab-panel>
        </q-tab-panels>
    </div>
  </div>
</template>

<script>
import {computed, ref} from "vue";
import {useStore} from "vuex";
import CandidatesTable from "./CandidatesTable.vue";
import ConfigTable from "./ConfigsTable.vue";

export default {
  name: "RightDrawerTables",
  components: {ConfigTable, CandidatesTable},
  setup() {
    return {
      tab: ref('candidates'),
    }
  }
}
</script>

