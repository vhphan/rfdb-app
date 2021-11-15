<template>
  <q-layout view="lHr lpR lFr">

    <q-header elevated class="bg-primary text-white" height-hint="58">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer"/>

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          RFDB Application
        </q-toolbar-title>

        <q-tabs align="left">
          <q-route-tab to="/" label="Home"/>
          <!--          <q-route-tab to="/page2" label="Page Two"/>-->
          <!--          <q-route-tab to="/page3" label="Page Three"/>-->
        </q-tabs>
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer"/>
      </q-toolbar>


    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->

      <VerTabs/>
    </q-drawer>

    <q-drawer
        side="right"
        v-model="rightDrawerOpen"
        show-if-above
        bordered
        :width="rightDrawerWidth"
        :breakpoint="500"
        class="bg-grey-3"
        style="height: 100%;"
    >
      <div class="row fit">
        <!-- The trick is here: adding the resize div and applying v-touch-pan on it. -->
        <div style="width: 6px; cursor: col-resize;" class="bg-primary"
             v-touch-pan.horizontal.prevent.mouse.preserveCursor="handlePan"
        ></div>
        <q-scroll-area class="fit col">

          <div v-if="rightDrawerOpen" class="absolute-top-right" style="z-index: 501;">
            <q-btn fab icon="close" color="negative" @click="closeRightDrawer"/>
          </div>
          <!--          <right-drawer-contents/>-->
<!--          <right-drawer-tables />-->
        </q-scroll-area>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
import {ref} from 'vue'
import VerTabs from "../components/VerTabs.vue";
import RightDrawerTables from "../components/RightDrawerTables.vue";
export default {
  components: {RightDrawerTables, VerTabs},
  setup() {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)
    const rightDrawerWidth = ref(600);
    let originalWidth;
    let originalLeft;
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      closeRightDrawer() {
        rightDrawerOpen.value = false;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value
      },
      rightDrawerWidth,
      handlePan({evt, ...newInfo}) {
        if (newInfo.isFirst) {
          originalWidth = rightDrawerWidth.value
          originalLeft = newInfo.position.left
        } else {
          const newDelta = newInfo.position.left - originalLeft;
          // Should add (instead of subtract) for left drawer
          let newWidth = Math.max(200, Math.min(800, originalWidth - newDelta));
          rightDrawerWidth.value = newWidth;
        }
      },
    }
  }
}
</script>

<style>
.q-page-container {
  padding-top: 0;
}
</style>