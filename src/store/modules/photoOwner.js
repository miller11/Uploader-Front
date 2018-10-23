const state = {
  photoOwner: false

};

const getters = {
  photoOwner : state => state.photoOwner
};

const mutations = {
  isPhotoOwner : (state, isPhotoOwner) => {
    state.photoOwner = !!isPhotoOwner;
  }
};

const actions = {
  setIsPhotoOwner :(context, isPhotoOwner) => {
    context.commit('isPhotoOwner', isPhotoOwner);
  }
};


export default {
  state,
  mutations,
  getters,
  actions
}
