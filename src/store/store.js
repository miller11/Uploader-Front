import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import photoOwner from './modules/photoOwner'
import { firebaseMutations} from 'vuexfire'

Vue.use(Vuex);

export const store = new Vuex.Store({
  mutations: { ...firebaseMutations },
  modules: {
    user, photoOwner
  }
});
