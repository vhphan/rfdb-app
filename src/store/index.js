import { createStore } from 'vuex';
import rfdb from './rfdb';


const store = createStore({
  modules: {
      rfdb,
  }
})
// Subscribe to store updates
store.subscribe((mutation, state) => {
    // Store the state object as a JSON string
    localStorage.setItem('store', JSON.stringify(state));
});

export default store;

