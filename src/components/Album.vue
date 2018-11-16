<template>
  <div class="col-lg-4 col-sm-6 portfolio-item">
    <div class="card h-100">
      <a @click="showModal" v-bind:style="{ backgroundImage: 'url(' + album.coverPhoto.url + ')' }" :alt="album.coverPhoto.name"
                                 class="card-img-top cover-photo"></a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="" class="btn-link" @click.prevent="showModal">{{ album.name }}</a>
        </h4>
        <p class="card-text">{{ album.description }} </p>
      </div>

      <div class="card-footer" v-if="isPhotoOwner && isEditScreen">
        <div class="float-right p-1">
          <a class="text-danger" href="" @click.prevent="deleteAlbum">
            <font-awesome-icon icon="trash"></font-awesome-icon>
          </a>
        </div>

        <div class="float-left p-1">
          <router-link :to="{name: 'albumLink', params: { albumKey: albumKey }}">
            <font-awesome-icon icon="wrench"></font-awesome-icon>
          </router-link>
        </div>
      </div>
    </div>

    <b-modal v-model="modalShow" :title="album.name" size="lg" :hide-footer="true">
      <b-carousel id="carousel1"
                  style="text-shadow: 1px 1px 2px #333;"
                  controls
                  indicators
                  :interval="5000">
        <b-carousel-slide v-for="(photo, key) in photos" :key="key" :img-src="photo.url"></b-carousel-slide>
      </b-carousel>
    </b-modal>
  </div>
</template>

<script>
  import bModal from 'bootstrap-vue/es/components/modal/modal';
  import bCarousel from 'bootstrap-vue/es/components/carousel/carousel';
  import bCarouselSlide from 'bootstrap-vue/es/components/carousel/carousel-slide';

  import {library} from '@fortawesome/fontawesome-svg-core'
  import {faTrash, faWrench} from '@fortawesome/free-solid-svg-icons'
  import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'


  import {dbAlbumPhotosRef, stAlbumPhotosRef} from "../firebaseConfig";


  library.add(faTrash);
  library.add(faWrench);

  export default {
    props: ['albumKey', 'album', 'editScreen'],
    data() {
      return {
        modalShow: false,
        photos: []
      }
    },
    components: {
      bModal: bModal,
      bCarousel: bCarousel,
      bCarouselSlide: bCarouselSlide,
      fontAwesomeIcon: FontAwesomeIcon
    },
    methods: {
      showModal() {
        let self = this;

        dbAlbumPhotosRef(this.albumKey).once('value').then(function (snapshot) {
          if (snapshot.hasChildren()) {
            self.photos = snapshot.val();
          }
        });

        this.modalShow = true;
      },
      deleteAlbum() {
        let self = this;

        if (confirm("Are you sure you wish to delete this album?")) {
          dbAlbumPhotosRef(this.albumKey).once('value').then(function (snapshot) {
            if (snapshot.hasChildren()) {
              self.photos = snapshot.val();
              self.deleteStorage();
            }
          });
        }

        },
      deleteStorage() {
        let self = this;

        for (let key in self.photos) {

          console.log(self.photos[key].name);

          // delete photos in album storage
          stAlbumPhotosRef(self.albumKey).child(self.photos[key].name).delete();
        }

        // delete photos database
        dbAlbumPhotosRef(self.albumKey).remove().then(function () {
          // Album deleted successfully
          console.log("Photos have been deleted");

        }).catch(function (error) {
          console.log("An error occurred trying to delete photos: " + error)
        });

        this.$emit('delete', this.albumKey);
      }
      },
      computed: {
        isPhotoOwner() {
          return this.$store.getters.photoOwner
        },
        isEditScreen() {
          if (this.editScreen != null) {
            return this.editScreen;
          }

          return false;
        }
      }
    }
</script>

<style scoped>
  .cover-photo {
    position: relative;
    float: left;
    width:  100%;
    height: 15rem;
    background: no-repeat 50% 50%;
    object-fit:scale-down;
    background-size:     cover;
    cursor: pointer;
  }

</style>
