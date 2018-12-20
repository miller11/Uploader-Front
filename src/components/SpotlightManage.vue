<template>
  <div class="full-page ml-5 pt-5">

    <table class="table table-hover">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th></th>
        <th scope="col">Date Added</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(photo, index) in spotLightPhotos" :key="photo.key">
        <th scope="row">{{ index + 1 }}</th>
        <td><img :src="photo.src" :alt="photo.name" class="img-thumbnail menu-thumbnail"></td>
        <td class="align-middle">{{new Date(photo.date) | formatDate}}</td>
        <td> <a class="btn btn-danger mt-3 " @click="remove(photo.key)"><font-awesome-icon icon="trash"></font-awesome-icon></a></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import { mapGetters } from 'vuex'

  import { dbSpotLightPhotosRef } from "../firebaseConfig";



  import {library} from '@fortawesome/fontawesome-svg-core'
  import {faTrash} from '@fortawesome/free-solid-svg-icons'
  import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

  library.add(faTrash);

  export default {
    components: {
      draggable,
      fontAwesomeIcon: FontAwesomeIcon
    },
    data() {
      return {
        photos: []
      }
    },
    methods: {
      remove(photoKey) {
        if (confirm("Are you sure you wish to remove this photo?")) {
          dbSpotLightPhotosRef.orderByChild('key').equalTo(photoKey)
            .once('value').then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
              //remove each child
              dbSpotLightPhotosRef.child(childSnapshot.key).remove();
            });
          });
        }
      }
    },
    computed: {
      ...mapGetters([
        'spotLightPhotos'
      ])
    }
  }
</script>

<style scoped>
  .full-page {
    padding-top: 1rem;
    height: 100%;
    min-height: 100vh;
    position: relative;
  }

  .menu-thumbnail {
    max-height: 5rem;
    min-height: 5rem;
    cursor: pointer;
  }
</style>
