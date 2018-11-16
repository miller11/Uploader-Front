import { firebaseAction } from 'vuexfire'

const state = {
  spotLightPhotos : []

};

const getters = {
  spotLightPhotos : state => state.spotLightPhotos
};

const mutations = {

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
