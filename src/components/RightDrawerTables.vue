<template>
  <q-layout
  >
    <q-header elevated class="bg-primary text-white" height-hint="58">
      <q-toolbar>
        <!--        <q-toolbar-title>-->
        <!--          -->
        <!--        </q-toolbar-title>-->

        <q-tabs align="left">
          <q-route-tab :to="{name: 'Candidates'}" label="Candidates"/>
          <q-route-tab :to="{name: 'Configs'}" label="Configs"/>
          <q-route-tab :to="{name: 'ChangeLogs'}" label="Change Logs"/>
        </q-tabs>
      </q-toolbar>
    </q-header>
    <q-page-container id="containerRight">
      <router-view name="right"/>
    </q-page-container>
  </q-layout>

</template>

<script>
import {computed, ref} from "vue";
import {useStore} from "vuex";
import CandidatesTable from "./CandidatesTable.vue";
import ConfigsTable from "./ConfigsTable.vue";

export default {
  name: "RightDrawerTables",
  components: {ConfigsTable, CandidatesTable},
  setup() {
    return {
      tab: ref('candidates'),
    }
  }
}
</script>

