<template>
  <div class="container padding full-page">
    <div class="row">
      <div class="col-sm-2">
        <router-link :to="{name: 'spotlightManage'}"><button class="btn btn-primary">Spotlight Photos</button></router-link>
      </div>

      <div class="col-sm-2 offset-8">
        <router-link :to="{name: 'albumLinkNew', params: { albumKey: null }}"><a href="" class="btn btn-success float-right">+ New
          Album</a></router-link>
      </div>
    </div>

    <div class="row pt-4">
      <u-album v-for="(album) in albums" :key="album['.key']" :album-key="album['.key']" :album="album" :edit-screen="true" @delete="deleteAlbum($event)"></u-album>
    </div>

  </div>
</template>

<script>
  import Album from "./Album"
  import { mapGetters } from 'vuex'

  import {dbAlbumsRef} from "../firebaseConfig";

  export default {
    components: {uAlbum: Album},
    computed: {
      ...mapGetters([
        'albums'
      ])
    },methods: {
      deleteAlbum(albumKey) {
        dbAlbumsRef.child(albumKey).remove().then(function() {
          // Album deleted successfully
          console.log("Album has been deleted");

        }).catch(function(error) {
          console.log("An error occurred trying to delete album: " + error)
        });
      }
    }
  }
</script>

<style scoped>
  .padding {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .full-page {
    height: 100%;
    min-height: 100vh;
    position: relative;
  }

  .white-text {
    color: white;
  }
</style>
