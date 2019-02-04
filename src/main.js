import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import Notifications from 'vue-notification'
import VuePhotoSwipe from 'vue-photoswipe'
import VueRouter from 'vue-router'
import VueAnalytics from 'vue-analytics'
import { routes } from './routes'
import {store} from "./store/store";

import moment from 'moment'


Vue.use(BootstrapVue);

Vue.use(Notifications);

Vue.use(VuePhotoSwipe);

Vue.use(VueRouter);


Vue.config.productionTip = false;

const isProd = process.env.NODE_ENV === 'production';

Vue.use(VueAnalytics, {
  id: 'UA-133664904-1',
  router,
  debug: {
    enabled: !isProd,
    sendHitTask: isProd
  }
});


const router = new VueRouter({
  routes // short for `routes: routes`
});

Vue.filter('prettyBytes', function (num) {
  // jacked from: https://github.com/sindresorhus/pretty-bytes
  if (typeof num !== 'number' || isNaN(num)) {
    throw new TypeError('Expected a number');
  }

  var exponent;
  var unit;
  var neg = num < 0;
  var units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  if (neg) {
    num = -num;
  }

  if (num < 1) {
    return (neg ? '-' : '') + num + ' B';
  }

  exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);
  num = (num / Math.pow(1000, exponent)).toFixed(2) * 1;
  unit = units[exponent];

  return (neg ? '-' : '') + num + ' ' + unit;
});

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
