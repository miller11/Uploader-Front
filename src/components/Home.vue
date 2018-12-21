<template>
  <div>
    <u-header></u-header>

    <!-- Page Content -->
    <div class="container">

      <h1 class="my-4">Welcome to Bob's Photos</h1>

      <div class="row">
        <u-album v-for="(album) in albums" :key="album['.key']" :album-key="album['.key']" :album="album" :edit-screen="false"></u-album>
      </div>
      <!-- /.row -->

      <div class="row">
        <hr>
      </div>

      <!-- Features Section -->
      <div class="row">
        <div class="col-lg-6">
          <h2>About Bob</h2>
          <p>Bob shoots with:</p>
          <ul>
            <li>Nikon DSLR</li>
            <!--<li></li>-->
            <!--<li></li>-->
            <!--<li></li>-->
            <!--<li></li>-->
          </ul>
          <p>These are a collection of Bob's photos, taken of family, nature and sports. </p>
        </div>
        <div class="col-lg-6">
          <img class="img-fluid rounded" height="450" width="700" src="https://firebasestorage.googleapis.com/v0/b/uploader-5bdaa.appspot.com/o/static%2Ffamily-pic-xmas.jpg?alt=media&token=68fcce42-e7e0-44c0-b692-826bddc20d8e" alt="Family Picture">
        </div>
      </div>
      <!-- /.row -->

      <hr>

      <!-- Call to Action Section -->
      <div class="row mb-4">
        <div class="col-md-8">
          <p>These photos are property of the photographer and this website and may only be used with permission.</p>
        </div>
        <div class="col-md-4">
          <a class="btn btn-lg btn-secondary btn-block"  href="mailto:bobm1627@gmail.com">Contact</a>
        </div>
      </div>

    </div>
    <!-- /.container -->
  </div>
</template>

<script>
  import Header from "./Header.vue"
  import Album from "./Album"
  import { mapGetters } from 'vuex'

  export default {
    components: {uHeader: Header, uAlbum: Album},
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters([
        'albums'
      ])
    }
  }
</script>

<style scoped>

</style>
