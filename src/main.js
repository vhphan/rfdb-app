// FILE: main.js

import {createApp} from 'vue';
import {Quasar} from 'quasar';
import iconSet from 'quasar/icon-set/fontawesome-v5'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css';
// import '@quasar/extras/mdi-v6/mdi-v6.css';
// Import Quasar css
import 'quasar/src/css/index.sass';

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue';
import router from './router';
import store from "./store";

const myApp = createApp(App);
myApp.use(router);
myApp.use(store);

myApp.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
    iconSet: iconSet
    /*
    config: {
      brand: {
        // primary: '#e46262',
        // ... or all other brand colors
      },
      notify: {...}, // default set of options for Notify Quasar plugin
      loading: {...}, // default set of options for Loading Quasar plugin
      loadingBar: { ... }, // settings for LoadingBar Quasar plugin
      // ..and many more (check Installation card on each Quasar component/directive/plugin)
    }
    */
});

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app');

router.afterEach((to, from) => {
    console.log(from);
    console.log(to);
    const rfTables = ['Nominal', 'Config', 'Candidates']
    if (rfTables.includes(to.name)) {
        store.dispatch('rfdb/setCurrentTable', to.name).then(() => {
        })
    } else {
        store.dispatch('rfdb/setCurrentTable', null).then(() => {
        })
    }
});