<template>
  <div class="container padding full-page">
    <div class="row">
      <div class="col-sm-2 offset-10">
        <router-link :to="{name: 'albumLink', params: { albumId: null }}"><a href="" class="btn btn-success">+ New Album</a></router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ManageAlbums"
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
