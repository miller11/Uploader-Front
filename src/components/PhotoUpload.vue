<template>
  <div class="pt-2">
    <div class="row">
      <div class="col-sm-12">
        <div id="file-drag-drop">
          <form ref="fileform" v-on:click="addFiles()" class="text-success drop-zone drop-zone-active" v-show="albumIsSaved">
            <span class="drop-files">Drag and drop a photo <br/> or browse</span>
          </form>

          <div class="text-secondary drop-zone" v-show="!albumIsSaved">
            <span class="drop-files">Save album to add photos</span>
          </div>
        </div>
      </div>


      <div class="col-sm-12">
        <label class="sr-only">Files
          <input type="file" id="files" ref="files" accept="image/*" multiple v-on:change="handleFilesUpload()"/>
        </label>
      </div>
    </div>

    <div class="row pt-1" v-for="(file, index) in files">
      <div class="col-sm-2">
        <font-awesome-icon icon="image" size="3x"></font-awesome-icon>
      </div>
      <div class="col-sm-10">
        <div class="row">
          <div class="col-sm-8">
            <span class="font-weight-light">{{ file.name }}</span>
          </div>
          <div class="col-sm-4">
            <span class="align-bottom text-muted float-right" v-if="filesMetaData[index].progress !== 100"><small>{{ filesMetaData[index].bytesTransferred | prettyBytes}} / {{ filesMetaData[index].totalBytes | prettyBytes}}</small></span>
            <span class="align-bottom text-muted float-right" v-else-if="filesMetaData[index].cancelled"><small>Cancelled</small></span>
            <span class="align-bottom text-muted float-right" v-else><small>Completed</small></span>
          </div>
        </div>

        <div class="row pt-1">
          <div class="col-sm-12">
          <b-progress :value="filesMetaData[index].progress" :max="100" height=".25rem"
                      class="align-top" :variant="filesMetaData[index].cancelled ? 'danger' : 'primary'" :striped="filesMetaData[index].cancelled"></b-progress>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {library} from '@fortawesome/fontawesome-svg-core'
  import {faTrash} from '@fortawesome/free-solid-svg-icons'
  import {faImage} from '@fortawesome/free-solid-svg-icons'
  import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

  import bProgress from 'bootstrap-vue/es/components/progress/progress';

  import {dbAlbumPhotosRef} from "../firebaseConfig";

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
    computed: {
      albumIsSaved() {
        return this.albumKey != null;
      }
    },
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
        let self = this;

        for (let i = 0; i < this.files.length; i++) {
          let file = self.files[i];
          let metaData = self.filesMetaData[i];
          let stAlbumRef = stAlbumsRef.child(self.albumKey);
          let uploadTask;

          if (metaData.progress !== 100) {
            let imageRef = stAlbumRef.child(file.name);
            uploadTask = imageRef.put(file);
          }

          if(uploadTask !== undefined) {
            uploadTask.on('state_changed', function (snapshot) {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              metaData.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              metaData.bytesTransferred = snapshot.bytesTransferred;
              metaData.totalBytes = snapshot.totalBytes;

            }, function (error) {
              // Handle unsuccessful uploads
            }, function () {
              // Handle successful uploads on complete
              uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log('File available at', downloadURL);

                // load file and calculate dimensions
                let fr = new FileReader;

                fr.onload = function() { // file is loaded
                  let img = new Image;

                  img.onload = function() {
                    let newFile = {
                      name: file.name,
                      upVotes: 0,
                      size: file.size,
                      type: file.type,
                      h: img.height,
                      w: img.width,
                      src: downloadURL
                    };

                    self.saveFileToAlbum(newFile); // save to database
                  };

                  img.src = fr.result; // is the data URL because called with readAsDataURL
                };

                fr.readAsDataURL(file);

              });
            });
          }
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
          this.addFileMetaData(uploadedFiles[i].size);
          this.files.push(uploadedFiles[i]);
        }

        this.submitFiles();
      },
      addFileMetaData(fileSize) {
        const newMetaData = {
          progress: 0,
          bytesTransferred: 0,
          totalBytes: fileSize
        };

        this.filesMetaData.push(newMetaData);
      },
      saveFileToAlbum(newFile) {
        let ref = dbAlbumPhotosRef(this.albumKey);
        let self = this;

        ref.push(newFile, function(error) {
          if (error) {
            console.log("Error occurred: " + error.message);
          } else {
            console.log("New photo has been saved.");
          }
        }).then((snap) => {
          self.$set(newFile, 'key', snap.key);

          self.$emit('newPhoto', newFile);
        });

      }
    },
    mounted() {
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
          this.addFileMetaData(e.dataTransfer.files[i].size);
          this.files.push(e.dataTransfer.files[i]);
        }

        this.submitFiles();
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

  .drop-zone {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 6em;
    text-align: center;
    border: 0.15em dashed currentColor;
  }

  .drop-zone-active:hover {
    border: 0.15em solid currentColor;
    cursor: pointer;
  }


</style>
