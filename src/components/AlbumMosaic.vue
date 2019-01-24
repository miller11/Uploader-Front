<template>
  <div class="container full-page">
    <h2>{{ albumName }}</h2>

    <div v-masonry transition-duration="0.3s" item-selector=".item" class="preview-img-list">
      <div v-masonry-tile class="item" v-for="(photo, index) in photoList">
        <div class="card img-wrapper" style="width: 18rem;">
           <img class="card-img-top preview-img-item" :src="photo.src" :alt="photo.name" >
            <div class="img-overlay" @click.prevent="$photoswipe.open(index, photoList)">
              <button type="button" class="btn btn-light" @click.stop="upVote(photo.src)"><font-awesome-icon icon="arrow-alt-circle-up"></font-awesome-icon> {{ getPhoto(photo.src).upVotes }}</button>
            </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import Vue from 'vue'
  import {VueMasonryPlugin} from 'vue-masonry';

  Vue.use(VueMasonryPlugin);

  import {library} from '@fortawesome/fontawesome-svg-core'
  import {faArrowAltCircleUp} from '@fortawesome/free-solid-svg-icons'
  import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

  library.add(faArrowAltCircleUp);

  import {dbAlbumPhotosRef} from "../firebaseConfig";


  export default {
    props: ['albumKey', 'albumName'],
    data() {
      return {
        photoList: [],
        dbPhotos: []
      }
    },
    components: {
      fontAwesomeIcon: FontAwesomeIcon
    },
    mounted: function () {
      let self = this;

      dbAlbumPhotosRef(self.albumKey).orderByChild('upVotes').once('value').then(function (snapshot) {
        if (snapshot.hasChildren()) {
          for (let key in snapshot.val()) {
            self.photoList.push({
              src: snapshot.val()[key]['src'],
              w: snapshot.val()[key]['w'],
              h: snapshot.val()[key]['h']
            });
          }

          self.dbPhotos = snapshot.val();
        }
      });
    },
    methods: {
      upVote(src) {
        let self = this;

        const photoKey = Object.entries(self.dbPhotos).find(p => p[1].src === src)[0];

        let photoUpVoteRef = dbAlbumPhotosRef(self.albumKey).child(photoKey).child('upVotes');

        photoUpVoteRef.transaction(function(upVotes) {
          upVotes = upVotes + 1;

          return upVotes || 0;
        });

        self.getDbPhotos();
      },
      getPhoto(src) {
        return Object.entries(this.dbPhotos).find(p => p[1].src === src)[1];
      },
      getDbPhotos() {
        let self = this;

        dbAlbumPhotosRef(self.albumKey).orderByChild('upVotes').once('value').then(function (snapshot) {
          if (snapshot.hasChildren()) {
            self.dbPhotos = snapshot.val();
          }
        });
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

  .preview-img-item {
    cursor: pointer;
  }

  .img-wrapper {
    position: relative;
  }

  .img-overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: right;
    margin-right: 2%;
    cursor: pointer;
  }

  .img-overlay:before {
    content: ' ';
    display: block;
     /*adjust 'height' to position overlay content vertically */
    height: 82%;
  }
</style>
