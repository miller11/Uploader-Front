<template>
<div class="container full-page">
  <h2>{{ albumName }}</h2>

  <div v-masonry transition-duration="0.3s" item-selector=".item">
    <div v-masonry-tile class="item" v-for="(photo, index) in photos">
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" :src="photo.src" :alt="photo.name" @click.prevent="">
      </div>
    </div>
  </div>
</div>

</template>

<script>
  import Vue from 'vue'
  import {VueMasonryPlugin} from 'vue-masonry';

  Vue.use(VueMasonryPlugin);

  import {dbAlbumPhotosRef} from "../firebaseConfig";


  export default {
    props: ['albumKey', 'albumName'],
    data() {
      return {
        photos: []
      }
    },
    mounted: function() {
      let self = this;

      dbAlbumPhotosRef(self.albumKey).once('value').then(function (snapshot) {
        if (snapshot.hasChildren()) {
          self.photos = snapshot.val();
        }
      });
    },
    methods: {
      launchModal() {
        let self = this;

        dbAlbumPhotosRef(this.albumKey).once('value').then(function (snapshot) {
          if (snapshot.hasChildren()) {
            self.photos = snapshot.val();
          }
        });

        this.modalShow = true;
      }
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
</style>
