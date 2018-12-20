<template>
  <div class="row pt-1">
    <div class="col-sm-2">
      <a @click="modalShow = true"><img :src="photo.src" :alt="photo.name" class="img-thumbnail menu-thumbnail"></a>
    </div>
    <div class="col-sm-10">
      <div class="row">
        <div class="col-sm-8">
          <div class="align-middle">
            <label-edit v-bind:text="photoName" v-on:text-updated-blur="textUpdated"
                        v-on:text-updated-enter="textUpdated"></label-edit>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="btn-group float-right">
            <button type="button" class="btn btn-outline-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
              <font-awesome-icon icon="list"></font-awesome-icon>
            </button>
            <div class="dropdown-menu">
              <a class="dropdown-item" @click="makeCoverPhoto"><font-awesome-icon v-if="isCoverPhoto" icon="check"></font-awesome-icon> Make Cover Photo</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" @click="toggleFrontPagePhoto" v-if="!frontPagePhoto">Add to Front-Page</a>
              <a class="dropdown-item" @click="toggleFrontPagePhoto" v-if="frontPagePhoto">Remove from Front-Page</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item text-danger" @click="deletePhoto">Delete</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal v-model="modalShow" :title="photoName" size="lg" :hide-footer="true">
      <img :src="photo.src" :alt="photo.name" class="img-thumbnail img-fluid">
    </b-modal>

  </div>
</template>

<script>
  import {library} from '@fortawesome/fontawesome-svg-core'
  import {faList, faCheck} from '@fortawesome/free-solid-svg-icons'
  import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

  library.add(faCheck);
  library.add(faList);

  import LabelEdit from 'label-edit'
  import bModal from 'bootstrap-vue/es/components/modal/modal';

  import {dbAlbumPhotosRef, dbSpotLightPhotosRef, stAlbumPhotosRef} from "../firebaseConfig";

  import { mapGetters } from 'vuex'



  export default {
    props: ['albumKey', 'photo', 'photoKey', 'coverPhotoKey'],
    data() {
      return {
        modalShow: false
      }
    },
    components: {
      fontAwesomeIcon: FontAwesomeIcon,
      labelEdit: LabelEdit,
      bModal: bModal
    },
    methods: {
      textUpdated(text) {
        let self = this;
        let ref = dbAlbumPhotosRef(this.albumKey).child(this.photoKey);
        let update = {displayName: text};

        ref.update(update, function (error) {
          if (error) {
            console.log("Error occurred: " + error.message);
          } else {
            self.$set(self.photo, 'displayName', text);
          }
        });
      },
      deletePhoto() {
        dbAlbumPhotosRef(this.albumKey).child(this.photoKey).remove().catch(function (error) {
          console.log("Error occurred: " + error.message);
        });

        stAlbumPhotosRef(this.albumKey).child(this.photo.name).delete().then(function () {
          console.log("Photo deleted");
        }).catch(function (error) {
          console.log("Error occurred: " + error.message);
        });

        this.$emit('delete', this.photoKey);
      },
      makeCoverPhoto() {
        let self = this;
        let ref = dbAlbumPhotosRef(this.albumKey).child(this.photoKey);
        let update = {coverPhoto: true};

        ref.update(update, function (error) {
          if (error) {
            console.log("Error occurred: " + error.message);
          } else {
            self.$set(self.photo, 'coverPhoto', true);
            self.$emit('coverPhoto', self.photoKey);
          }
        });
      },
      toggleFrontPagePhoto() {
        let self = this;
        let status = true;

        if(self.frontPagePhoto) {
          status = false;
        }

        if(status) {
          self.$set(self.photo, 'key', self.photoKey);
          self.$set(self.photo, 'date', Date.now());
          dbSpotLightPhotosRef.push(self.photo)
        } else {
          dbSpotLightPhotosRef.orderByChild('key').equalTo(this.photoKey)
            .once('value').then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              //remove each child
              dbSpotLightPhotosRef.child(childSnapshot.key).remove();
            });
          });
        }

      }
    },
    computed: {
      ...mapGetters([
        'spotLightPhotos'
      ]),
      photoName() {
        if (this.photo.displayName !== undefined && this.photo.displayName !== null) {
          return this.photo.displayName
        }

        return this.photo.name
      },
      isCoverPhoto() {
        return this.photoKey === this.coverPhotoKey;
      },
      frontPagePhoto() {
        return this.spotLightPhotos.filter(e => e['key'] === this.photoKey).length > 0;
      }
    }
  }
</script>

<style scoped>
  .menu-thumbnail {
    max-height: 5rem;
    min-height: 5rem;
    cursor: pointer;
  }

  .dropdown-item {
    cursor: pointer;
  }
</style>
