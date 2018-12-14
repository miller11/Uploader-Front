<template>
  <draggable v-model='spotLightPhotos'></draggable>
</template>

<script>
  import {store} from '../store/store';


  export default {
    data() {
      return {
        photos: []
      }
    },
    computed: {
      spotLightPhotos: {
        get() {
          return this.$store.state.spotLightPhotos
        },
        set(value) {
          this.$store.commit('spotLightPhotos', value)
        }
      }
    }
  }
</script>

<style scoped>

</style>
