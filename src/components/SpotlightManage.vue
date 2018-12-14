<template>
    
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        photos: []
      }
    },
    computed: {
      ...mapGetters([
        'spotLightPhotos'
      ])
    }
  }
</script>

<style scoped>

</style>
