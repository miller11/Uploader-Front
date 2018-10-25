<template>
  <div class="container">

    <div class="row">
      <div id="file-drag-drop col-sm-12">
        <form ref="fileform" v-on:click="addFiles()" class="text-success">
          <span class="drop-files">Drag and drop a file</span>
        </form>
      </div>


      <div class="large-12 medium-12 small-12 cell">
        <label class="sr-only">Files
          <input type="file" id="files" ref="files" multiple v-on:change="handleFilesUpload()"/>
        </label>
      </div>
    </div>

    <div class="row">
      <div class="col-2">
        <font-awesome-icon icon="image" size="3x"/>
      </div>
      <div class="col-10">
        <div class="row">

        </div>

        <div class="row pt-1">
          <b-progress :value="69" :max="100" height=".5rem" class="w-75 align-baseline"></b-progress>
        </div>
      </div>
    </div>


    <button @click="submitFiles" class="btn btn-primary">Submit</button>

  </div>
</template>

<script>
  import {library} from '@fortawesome/fontawesome-svg-core'
  import {faTrash} from '@fortawesome/free-solid-svg-icons'
  import {faImage} from '@fortawesome/free-solid-svg-icons'
  import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

  import bProgress from 'bootstrap-vue/es/components/progress/progress';


  import {stAlbumsRef} from "../firebaseConfig";

  library.add(faTrash);
  library.add(faImage);

  export default {
    components: {
      fontAwesomeIcon: FontAwesomeIcon,
      bProgress: bProgress
    },

    props: ['albumKey'],
    /*
      Defines the data used by the component
    */
    data() {
      return {
        files: []
      }
    },

    /*
      Defines the method used by the component
    */
    methods: {
      /*
        Adds a file
      */
      addFiles() {
        this.$refs.files.click();
      },

      /*
        Submits files to the server
      */
      submitFiles() {
        for (let i = 0; i < this.files.length; i++) {
          let file = this.files[i];

          let imageRef = stAlbumsRef.child(file.name);

          let uploadTask = imageRef.put(file);

          uploadTask.on('state_changed', function (snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          }, function (error) {
            // Handle unsuccessful uploads
          }, function () {
            // Handle successful uploads on complete
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
              console.log('File available at', downloadURL);
            });
          });

        }


        /*
          Initialize the form data
        */
        // let formData = new FormData();
        //
        // /*
        //   Iteate over any file sent over appending the files
        //   to the form data.
        // */
        // for (var i = 0; i < this.files.length; i++) {
        //   let file = this.files[i];
        //
        //   formData.append('files[' + i + ']', file);
        // }
        //
        // /*
        //   Make the request to the POST /select-files URL
        // */
        // axios.post('/select-files',
        //   formData,
        //   {
        //     headers: {
        //       'Content-Type': 'multipart/form-data'
        //     }
        //   }
        // ).then(function () {
        //   console.log('SUCCESS!!');
        // })
        //   .catch(function () {
        //     console.log('FAILURE!!');
        //   });
      },

      /*
        Handles the uploading of files
      */
      handleFilesUpload() {
        let uploadedFiles = this.$refs.files.files;

        /*
          Adds the uploaded file to the files array
        */
        for (var i = 0; i < uploadedFiles.length; i++) {
          this.files.push(uploadedFiles[i]);
        }
      },

      /*
        Removes a select file the user has uploaded
      */
      removeFile(key) {
        this.files.splice(key, 1);
      }
    }, mounted() {
      ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function (evt) {
        /*
          For each event add an event listener that prevents the default action
          (opening the file in the browser) and stop the propagation of the event (so
          no other elements open the file in the browser)
        */
        this.$refs.fileform.addEventListener(evt, function (e) {
          e.preventDefault();
          e.stopPropagation();
        }.bind(this), false);
      }.bind(this));

      /*
        Add an event listener for drop to the form
      */
      this.$refs.fileform.addEventListener('drop', function (e) {
        /*
          Capture the files from the drop event and add them to our local files
          array.
        */
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
          this.files.push(e.dataTransfer.files[i]);
        }
      }.bind(this));
    }
  }


</script>

<style scoped>
  input[type="file"] {
    position: absolute;
    top: -500px;
  }

  div.file-listing {
    width: 200px;
  }

  form {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 6em;
    margin: 40px auto auto;
    text-align: center;
    border: 0.15em dashed currentColor;
  }

  form:hover {
    border: 0.15em solid currentColor;
    cursor: pointer;
  }


</style>
