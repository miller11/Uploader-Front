import { firebaseAction } from 'vuexfire'
import Vue from 'vue'


const state = {
  spotLightPhotos : []

};


const getters = {
  spotLightPhotos : state => state.spotLightPhotos.sort((a,b) => { return new Date(b.date) - new Date(a.date) }),
  numSpotLightPhotos : state => state.spotLightPhotos.length
};

const mutations = {
  setSpotLightPhotos : (state, spotLightPhotos) => Vue.set(state, 'spotLightPhotos', spotLightPhotos)
};

const actions = {
  setSpotLightPhotosRef : firebaseAction(({ bindFirebaseRef }, { ref }) => {
    // binding will automatically unbind any previously bound ref so you
    bindFirebaseRef('spotLightPhotos', ref);
  })
};


export default {
  state,
  mutations,
  getters,
  actions
}
