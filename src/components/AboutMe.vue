<template>
  <div class="container full-page">
    <div class="row pt-3"><h2>About Me</h2></div>

    <div class="row pt-2">
      <form @submit.prevent="save">
        <div class="form-group">
          <label for="message" class="sr-only">Message</label>
          <vue-editor id="message" v-model="message" placeholder="message"></vue-editor>
        </div>
        <div class="form-group">
          <div class="input-group mb-3">
            <div class="custom-file">
              <input type="file"  class="custom-file-input" id="inputGroupFile02" ref="file" v-on:change="onFileChange"/>
              <label class="custom-file-label" for="inputGroupFile02">{{ fileImage != null ? fileImage.name : 'Choose file' }}</label>
            </div>

          </div>

          <span v-if="photo !== null" class="form-text" >Current Photo: <span class="text-muted">{{ photo.name }}</span></span>
        </div>

        <button type="submit" class="btn btn-primary">Save</button>
      </form>

    </div>


  </div>


</template>

<script>
  import { VueEditor } from "vue2-editor";
  import {dbAboutMeRef, stAboutMeRef} from "../firebaseConfig";

    export default {
      data() {
        return {
          photo: null,
          message: null,
          fileImage: null
        }
      },
      components: {
        VueEditor
      },
      mounted() {
        let self = this;

        dbAboutMeRef.child("message").once('value').then(function (snapshot) {
            self.message = snapshot.val();
        });


        dbAboutMeRef.child("photo").once('value').then(function (snapshot) {
            self.photo = snapshot.val();
        });
      },
      methods: {
        save: function () {

          dbAboutMeRef.child("message").set(this.message);

          if(this.fileImage !== null) {
            let file = this.fileImage;
            let uploadTask = stAboutMeRef.put(file);
            let self = this;

            uploadTask.on('state_changed', function (snapshot) {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

            }, function (error) {
              alert("An error occurred uploading the photo.")
            }, function () {
              // Handle successful uploads on complete
              uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {

                // load file and calculate dimensions
                let fr = new FileReader;

                fr.onload = function () { // file is loaded
                  let img = new Image;

                  img.onload = function () {
                    let newFile = {
                      name: file.name,
                      upVotes: 0,
                      size: file.size,
                      type: file.type,
                      h: img.height,
                      w: img.width,
                      src: downloadURL
                    };

                    dbAboutMeRef.child("photo").set(newFile);
                    self.photo = newFile;


                  };

                  img.src = fr.result; // is the data URL because called with readAsDataURL
                };

                fr.readAsDataURL(file);


                this.$notify({
                  group: 'foo',
                  title: 'Important message',
                  text: 'Hello user! This is a notification!'
                });

              });
            });
          }

            this.$notify({
              group: 'foo',
              title: 'About Me updated',
              text: '',
              position: 'bottom left',
              type: 'success'
            });
        },
        onFileChange() {
          this.fileImage = this.$refs.file.files[0];
        },
        createImage(file) {
          let reader = new FileReader();
          let self = this;

          reader.onload = (e) => {
            self.fileImage = e.target.result;
          };

          reader.readAsDataURL(file);
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
