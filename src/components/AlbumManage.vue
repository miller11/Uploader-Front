<template>
  <div class="container pt-2 full-page">

    <div class="row">
      <b-alert :show="alert.successCountDown"
               dismissible
               variant="success"
               @dismissed="alert.successCountDown=0">{{ alert.message }}
      </b-alert>

      <b-alert :show="alert.warningCountDown"
               dismissible
               variant="warning"
               @dismissed="alert.warningCountDown=0">{{ alert.message }}
      </b-alert>
    </div>

    <div class="row">
      <div class="col-sm-12 col-md-6">
          <form @submit.prevent="saveAlbum">
            <div class="form-group">
              <label for="nameInput">Album name</label>
              <input type="text" class="form-control" id="nameInput" v-model="album.name" placeholder="Album name">
            </div>

            <div class="form-group">
              <label for="descriptionInput">Description</label>
              <textarea class="form-control" id="descriptionInput" v-model="album.description" placeholder="Description" rows="3"></textarea>
            </div>

            <div class="form-check">
              <input type="checkbox" v-model="album.private" class="form-check-input" id="privateCheck">
              <label class="form-check-label" for="privateCheck">Private</label>
            </div>


            <button type="submit" class="btn btn-primary float-right">Save</button>
          </form>

          <hr class="mt-5"/>
      </div>

      <div class="col-sm-12 col-md-6">
        <h3>Photos</h3>

        <hr/>

        <u-photo-manage v-for="(photo, key) in photos" :key="key" :album-key="albumKey" :cover-photo-key="coverPhotoKey"
                        :photo="photo" :photo-key="key" @delete="removePhoto($event)" @coverPhoto="coverPhoto($event)"></u-photo-manage>
      </div>

    </div>

    <!--<h3 v-for="(photo, key) in photos" :key="key" :album-key="albumKey">{{key}}</h3>-->


    <div class="row" v-if="hasPhotos">
      <div class="col-sm-12 col-md-6">
          <u-photo-upload :album-key="albumKey" @newPhoto="newPhoto($event)"></u-photo-upload>
      </div>
    </div>

  </div>
</template>

<script>
  import PhotoUpload from './PhotoUpload'
  import PhotoManage from './PhotoManage'

  import bAlert from 'bootstrap-vue/es/components/alert/alert';
  import {dbAlbumsRef, dbAlbumPhotosRef} from "../firebaseConfig";


  export default {
    components: {
      bAlert: bAlert,
      uPhotoUpload: PhotoUpload,
      uPhotoManage: PhotoManage
    },
    data() {
      return {
        album: {},
        albumKey: this.$route.params.albumKey,
        photos: {},
        alert: {
          message: '',
          warningCountDown: 0,
          successCountDown: 0
        }
      }
    },
    methods: {
      saveAlbum() {
        let self = this;

        if (self.albumKey === undefined || self.albumKey === null) {
          self.albumKey = dbAlbumsRef.push(self.album, function (error) {
            if (error) {
              self.alert.message = "There was an issue saving the album." + error.message;
              self.alert.warningCountDown = 5;
            } else {
              self.alert.message = "Album has been saved";
              self.alert.successCountDown = 5;
            }
          }).key;
        } else {
          dbAlbumsRef.child(self.albumKey).update(self.album, function (error) {
            if (error) {
              self.alert.message = "There was an issue saving the album." + error.message;
              self.alert.warningCountDown = 5;
            } else {
              self.alert.message = "Album has been saved";
              self.alert.successCountDown = 5;
            }
          });
        }
      },
      newPhoto(newPhoto) {
        let self = this;

        self.$set(self.photos, newPhoto.key, newPhoto);

        if(self.album.coverPhoto === undefined || self.album.coverPhoto === null) {
          self.$set(self.album, 'coverPhoto', newPhoto);
        }

        if(self.album.photoCount === undefined || self.album.photoCount === null) {
          self.$set(self.album, 'photoCount', 1);
        } else {
          self.album.photoCount++;
        }

        self.saveAlbum();
      },
      removePhoto(key) {
        this.$delete(this.photos, key);

        if(this.album.coverPhoto.key === key) {
          this.album.coverPhoto = null;
        }

        this.album.photoCount--;
        this.saveAlbum();
      },
      coverPhoto(photoKey) {
        let self = this;
        self.album.coverPhoto = self.photos[photoKey];
        self.$set(self.album.coverPhoto, 'key', photoKey);

        dbAlbumsRef.child(self.albumKey).update(self.album, function (error) {
          if (error) {
            console.log("Error occurred: " + error.message);
          } else {
            self.alert.message = "Album has been saved";
            self.alert.successCountDown = 5;
          }
        });
      }
    },
    computed: {
      hasPhotos() {
        return this.albumKey != null && this.photos != null;
      },
      coverPhotoKey() {
        if(this.album.coverPhoto === undefined || this.album.coverPhoto === null){
          return "";
        } else {
          return this.album.coverPhoto.key;
        }
      }
    },
    mounted() {
      let self = this;

      if (self.albumKey != null) {
        dbAlbumsRef.child(self.albumKey).once('value').then(function (snapshot) {
          self.album = snapshot.val();
        });

        dbAlbumPhotosRef(self.albumKey).once('value').then(function (snapshot) {
          if(snapshot.hasChildren()) {
            self.photos = snapshot.val();
          }
        });

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
