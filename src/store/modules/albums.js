import { firebaseAction } from 'vuexfire'

const state = {
  albums: []

};

const getters = {
  albums : state => state.albums
};

const mutations = {

};

const actions = {
  setAlbumsRef : firebaseAction(({ bindFirebaseRef }, { ref }) => {
    // binding will automatically unbind any previously bound ref so you
    bindFirebaseRef('albums', ref);
  })
};


export default {
  state,
  mutations,
  getters,
  actions
}
