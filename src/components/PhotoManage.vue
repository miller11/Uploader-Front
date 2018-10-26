<template>
  <div class="row pt-1">
    <div class="col-sm-2">
      <img :src="photo.url" :alt="photo.name" class="img-thumbnail menu-thumbnail">
    </div>
    <div class="col-sm-10">
      <div class="row">
        <div class="col-sm-8">
          <div class="align-middle">
            <label-edit v-bind:text="photoName" v-on:text-updated-blur="textUpdated" v-on:text-updated-enter="textUpdated"></label-edit>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="btn-group float-right">
            <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <font-awesome-icon icon="list"></font-awesome-icon>
            </button>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="#">Make Cover Photo</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Add to Marquee</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item text-danger" href="#">Delete</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {library} from '@fortawesome/fontawesome-svg-core'
  import {faList} from '@fortawesome/free-solid-svg-icons'
  import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
  import {dbAlbumPhotosRef} from "../firebaseConfig";
  import LabelEdit from 'label-edit'

  library.add(faList);


  export default {
      props: ['albumKey', 'photo', 'photoKey'],
      components: {
        fontAwesomeIcon: FontAwesomeIcon,
        labelEdit: LabelEdit
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

        },
        makeCoverPhoto() {

        },
        makeMarqueePhoto() {

        }
      },
      computed: {
        photoName() {
          if(this.photo.displayName !== undefined && this.photo.displayName !== null) {
            return this.photo.displayName
          }

          return this.photo.name
        }
      }
    }
</script>

<style scoped>
  .menu-thumbnail {
    max-height: 5rem;
    min-height: 5rem;
  }
</style>
