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

      <!-- Features Section -->
      <div class="row">
        <div class="col-lg-6">
          <h2>About Bob</h2>
          <p>Bob shoots with:</p>
          <ul>
            <li>Nikon</li>
            <li>Something</li>
            <li>Something</li>
            <li>Working contact form with validation</li>
            <li>Unstyled page elements for easy customization</li>
          </ul>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, omnis doloremque non cum id
            reprehenderit, quisquam totam aspernatur tempora minima unde aliquid ea culpa sunt. Reiciendis quia dolorum
            ducimus unde.</p>
        </div>
        <div class="col-lg-6">
          <img class="img-fluid rounded" src="http://placehold.it/700x450" alt="Family Picture">
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
          <a class="btn btn-lg btn-secondary btn-block" href="#">Contact</a>
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
