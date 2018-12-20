import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import photoOwner from './modules/photoOwner'
import albums from './modules/albums'
import spotLightPhotos from './modules/spotlightPhotos'
import { firebaseMutations} from 'vuexfire'

Vue.use(Vuex);

export const store = new Vuex.Store({
  mutations: { ...firebaseMutations },
  modules: {
    user, photoOwner, albums, spotLightPhotos
  }
});
