<template>
  <header>
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" :data-slide-to="key"  v-for="(image, key) in spotLightPhotos" :key="key"></li>
        <!--<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>-->
        <!--<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>-->
      </ol>
      <div class="carousel-inner" role="listbox">
        <!-- Slides -->


        <div class="carousel-item" :class="{ 'active' : key === 0}" v-for="(image, key, index) in spotLightPhotos" :key="key"
             v-bind:style="{ backgroundImage: 'url(' + image.src + ')' }">
          <div class="carousel-caption d-none d-md-block">
            <!--<h3>First Slide</h3>-->
            <p class="sr-only">{{ image.name }}</p>
          </div>
        </div>


      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </header>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        photos: []
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

</style>
