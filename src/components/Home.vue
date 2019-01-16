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
          <p v-html="aboutMeMessage"></p>
        </div>
        <div class="col-lg-6">
          <img class="img-fluid rounded" height="450" width="700" :src="aboutMePhoto.src" :alt="aboutMePhoto.name">
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <router-link :to="{name: 'aboutMe'}">
            <a v-if="photoOwner" class="btn btn-sm btn-primary float-right" style="color: white">Edit</a>
          </router-link>
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
  import {dbAboutMeRef} from "../firebaseConfig";


  export default {
    components: {uHeader: Header, uAlbum: Album},
    data() {
      return {
        aboutMeMessage: null,
        aboutMePhoto: null
      }
    },
    computed: {
      ...mapGetters([
        'albums', 'photoOwner'
      ])
    },
    mounted() {
      let self = this;

      dbAboutMeRef.child("message").once('value').then(function (snapshot) {
        self.aboutMeMessage = snapshot.val();
      });


      dbAboutMeRef.child("photo").once('value').then(function (snapshot) {
        self.aboutMePhoto = snapshot.val();
      });
    }
  }
</script>

<style scoped>

</style>
