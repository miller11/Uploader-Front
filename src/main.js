import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import {store} from "./store/store";


Vue.use(BootstrapVue);

Vue.use(VueRouter);



const router = new VueRouter( {
  routes,
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if(to.hash) {
      return { selector: to.hash }
    }
  }
});


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
