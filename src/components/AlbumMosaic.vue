<template>

</template>

<script>
  import {dbAlbumPhotosRef} from "../firebaseConfig";

  export default {
    props: ['albumKey'],
    data() {
      return {
        photos: []
      }
    },
    created() {
      let self = this;

      dbAlbumPhotosRef(this.albumKey).once('value').then(function (snapshot) {
        if (snapshot.hasChildren()) {
          self.photos = snapshot.val();
        }
      });
    }
  }
</script>

<style scoped>

</style>
