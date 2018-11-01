<template>
  <div class="col-lg-4 col-sm-6 portfolio-item">
    <div class="card h-100">
      <a @click="showModal"><img :src="album.coverPhoto.url" :alt="album.coverPhoto.name" class="card-img-top"></a>
      <div class="card-body">
        <h4 class="card-title">
          <a @click="showModal">{{ album.name }}</a>
        </h4>
        <p class="card-text">{{ album.description }} </p>
      </div>
    </div>

    <b-modal v-model="modalShow" :title="album.name" size="lg" :hide-footer="true">
      <b-carousel id="carousel1"
                  style="text-shadow: 1px 1px 2px #333;"
                  controls
                  indicators
                  :interval="2000"
      >
        <b-carousel-slide v-for="(photo, key) in photos" :key="key"
                          :text="photo.name "
                          :img-src="photo.url"
        ></b-carousel-slide>
      </b-carousel>
    </b-modal>
  </div>
</template>

<script>
  import bModal from 'bootstrap-vue/es/components/modal/modal';
  import bCarousel from 'bootstrap-vue/es/components/carousel/carousel';
  import bCarouselSlide from 'bootstrap-vue/es/components/carousel/carousel-slide';

  import {dbAlbumPhotosRef} from "../firebaseConfig";


  export default {
    props: ['albumKey', 'album'],
    data() {
      return {
        modalShow: false,
        photos: []
      }
    },
    components: {
      bModal: bModal,
      bCarousel: bCarousel,
      bCarouselSlide: bCarouselSlide
    },
    methods: {
      showModal() {
        let self = this;

        dbAlbumPhotosRef(self.albumKey).once('value').then(function (snapshot) {
          if(snapshot.hasChildren()) {
            self.photos = snapshot.val();
          }
        });


        this.modalShow = true;
      }
    }
  }
</script>

<style scoped>

</style>
