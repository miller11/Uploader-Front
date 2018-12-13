<template>
  <div class="container full-page">
    <h2>{{ albumName }}</h2>

    <div v-masonry transition-duration="0.3s" item-selector=".item" class="preview-img-list">
      <div v-masonry-tile class="item" v-for="(photo, index) in photos">
        <div class="card" style="width: 18rem;">
          <img class="card-img-top preview-img-item" :src="photo.src" :alt="photo.name" @click="$photoswipe.open(index, photos)">
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
    mounted: function () {
      let self = this;

      dbAlbumPhotosRef(self.albumKey).once('value').then(function (snapshot) {
        if (snapshot.hasChildren()) {
          for (let key in snapshot.val()) {
            self.photos.push({
              src: snapshot.val()[key]['src'],
              w: snapshot.val()[key]['width'],
              h: snapshot.val()[key]['height']
            })
          }
        }
      });
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

  .preview-img-item{
    cursor: pointer;
  }
</style>
