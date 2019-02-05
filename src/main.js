import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import Notifications from 'vue-notification'
import VuePhotoSwipe from 'vue-photoswipe'
import VueAnalytics from 'vue-ua'
import VueRouter from 'vue-router'
import { routes } from './routes'
import {store} from "./store/store";

import moment from 'moment'


Vue.use(BootstrapVue);

Vue.use(Notifications);

Vue.use(VuePhotoSwipe);

Vue.use(VueRouter);


Vue.config.productionTip = false;

const router = new VueRouter({
  routes // short for `routes: routes`
});


Vue.use(VueAnalytics, {
  // [Required] The name of your app as specified in Google Analytics.
  appName: 'Bobs Photos',
  // [Required] The version of your app.
  appVersion: '<app_version>',
  // [Required] Your Google Analytics tracking ID.
  trackingId: 'UA-133664904-1',
  // If you're using vue-router, pass the router instance here.
  vueRouter: router,

});

Vue.analytics.trackView(router.currentRoute);



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
