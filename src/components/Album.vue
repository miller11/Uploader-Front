<template>
  <div class="container padding full-page">

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
      <div class="col-md-6">
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
    </div>
  </div>
</template>

<script>

  import bAlert from 'bootstrap-vue/es/components/alert/alert';
  import {dbAlbumsRef} from "../firebaseConfig";


  export default {
        components:  {
          bAlert: bAlert
        },
        data() {
          return {
            album: {},
            albumId: this.$route.params.albumId,
            alert: {
              message: '',
              warningCountDown: 0,
              successCountDown: 0
            }
          }
        },
      methods: {
        saveAlbum() {
          dbAlbumsRef.push(this.album);

          this.alert.message = "Album has been saved";
          this.alert.successCountDown = 5;
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
</style>
