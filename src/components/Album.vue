<template>
  <div class="container pt-2 full-page">

    <div class="row">
      <b-alert :show="alert.successCountDown"
               dismissible
               variant="success"
               @dismissed="alert.successCountDown=0">{{ alert.message }}</b-alert>

      <b-alert :show="alert.warningCountDown"
               dismissible
               variant="warning"
               @dismissed="alert.warningCountDown=0">{{ alert.message }}</b-alert>
    </div>

    <div class="row">
      <div class="col-sm-12 col-md-6">
        <form @submit.prevent="saveAlbum">
          <div class="form-group">
            <label for="nameInput">Album name</label>
            <input type="text" class="form-control" id="nameInput" v-model="album.name" placeholder="Album name">
          </div>

          <div class="form-check">
            <input type="checkbox" v-model="album.private" class="form-check-input" id="privateCheck">
            <label class="form-check-label" for="privateCheck">Private</label>
          </div>



          <button type="submit" class="btn btn-primary float-right">Save</button>
        </form>
      </div>

      <div class="col-sm-12 col-md-6">
        <u-files :album-key="albumKey"></u-files>
      </div>

    </div>

  </div>
</template>

<script>
  import Files from './Files'

  import bAlert from 'bootstrap-vue/es/components/alert/alert';
  import {dbAlbumsRef} from "../firebaseConfig";


  export default {
        components:  {
          bAlert: bAlert,
          uFiles: Files
        },
        data() {
          return {
            album: {},
            albumKey: this.$route.params.albumKey,
            alert: {
              message: '',
              warningCountDown: 0,
              successCountDown: 0
            }
          }
        },
      methods: {
        saveAlbum() {
          let data = this;

          if(data.albumKey === null) {
          data.albumKey = dbAlbumsRef.push(data.album, function(error) {
            if (error) {
              data.alert.message = "There was an issue saving the album." + error.message;
              data.alert.warningCountDown = 5;
            } else {
              data.alert.message = "Album has been saved";
              data.alert.successCountDown = 5;
            }
          }).key;
          } else {
            dbAlbumsRef.child(data.albumKey).update(data.album, function(error) {
              if (error) {
                data.alert.message = "There was an issue saving the album." + error.message;
                data.alert.warningCountDown = 5;
              } else {
                data.alert.message = "Album has been saved";
                data.alert.successCountDown = 5;
              }
            });
          }
        }
      }
    }
</script>

<style scoped>
  .full-page {
    height: 100%;
    min-height: 100vh;
    position: relative;
  }
</style>
