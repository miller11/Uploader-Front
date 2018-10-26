<template>
  <div class="container">

    <div class="row">
      <div class="col-sm-12">
        <div id="file-drag-drop">
          <form ref="fileform" v-on:click="addFiles()" class="text-success">
            <span class="drop-files">Drag and drop a file</span>
          </form>

        </div>
      </div>


      <div class="col-sm-12">
        <label class="sr-only">Files
          <input type="file" id="files" ref="files" multiple v-on:change="handleFilesUpload()"/>
        </label>
      </div>
    </div>

    <div class="row pt-1" v-for="(file, index) in files">
      <div class="col-sm-2">
        <font-awesome-icon icon="image" size="3x"/>
      </div>
      <div class="col-sm-10">
        <div class="row">
          <div class="col-sm-10">
            <span class="font-weight-light">{{ file.name }}</span>
          </div>
          <div class="col-sm-2">
            <button type="button" @click="removeFile( index )" class="close float-right" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>

        <div class="row pt-1">
          <div class="col-sm-12">
          <b-progress :value="filesMetaData[index].progress" :max="100" height=".25rem"
                      class="align-top" :variant="filesMetaData[index].cancelled ? 'danger' : 'primary'" :striped="filesMetaData[index].cancelled"></b-progress>
          </div>
          <div class="col-sm-12">
            <span class="align-bottom text-muted float-right" v-if="filesMetaData[index].progress !== 100"><small>{{ filesMetaData[index].bytesTransferred }} / {{ filesMetaData[index].totalBytes | prettyBytes}}</small></span>
            <span class="align-bottom text-muted float-right" v-else-if="filesMetaData[index].cancelled"><small>Cancelled</small></span>
            <span class="align-bottom text-muted float-right" v-else><small>Completed</small></span>
          </div>
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
        files: [],
        filesMetaData: []
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
          let metaData = this.filesMetaData[i];
          let uploadTask;

          if (!metaData.cancelled) {
            let imageRef = stAlbumsRef.child(file.name);
            uploadTask = imageRef.put(file);
          }

          uploadTask.on('state_changed', function (snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            metaData.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            metaData.bytesTransferred = snapshot.bytesTransferred;
            metaData.totalBytes = snapshot.totalBytes;

            if (metaData.cancelled) {
              uploadTask.cancel();
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
      },

      /*
        Handles the uploading of files
      */
      handleFilesUpload() {
        let uploadedFiles = this.$refs.files.files;

        /*
          Adds the uploaded file to the files array and metaData array
        */
        for (let i = 0; i < uploadedFiles.length; i++) {
          const newMetaData = {
            progress: 0,
            bytesTransferred: 0,
            totalBytes: uploadedFiles[i].size,
            cancelled: false
          };

          this.filesMetaData.push(newMetaData);
          this.files.push(uploadedFiles[i]);
        }
      },

      /*
        Removes a select file the user has uploaded
      */
      removeFile(key) {
        //this.files.splice(key, 1);
        this.filesMetaData[key].cancelled = true;
        this.filesMetaData[key].progress = 100;
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
