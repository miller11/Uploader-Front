import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import {store} from "./store/store";

Vue.use(BootstrapVue);

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
