<template>
  <draggable v-model='spotLightPhotos'>
    <div v-for="element in spotLightPhotos" :key="element.id" class="item">
      {{element.name}}
    </div>
    <button slot="header" @click="addPeople">Add</button>
  </draggable>
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
