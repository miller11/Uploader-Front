<template>
  <div>

    <div id="file-drag-drop">
      <form ref="fileform" v-on:click="addFiles()" class="text-success">
        <span class="drop-files">Drag and drop a file</span>
      </form>
    </div>


    <div class="large-12 medium-12 small-12 cell">
      <label>Files
        <input type="file" id="files" ref="files" multiple v-on:change="handleFilesUpload()"/>
      </label>
    </div>

    <div class="form-group inputDnD">
      <label class="sr-only" for="inputFile">File Upload</label>
      <input type="file" class="form-control-file text-warning font-weight-bold" id="inputFile" accept="image/*" data-title="Drag and drop a file">
    </div>

    <table class="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Size</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(file, index) in files" class="file-listing">
        <td scope="row">{{ index + 1 }}</td>
        <td>{{ file.name }}</td>
        <td>{{ file.size | prettyBytes }}</td>
        <td><span class="btn btn-danger btn-sm" v-on:click="removeFile( index )"><font-awesome-icon icon="trash"></font-awesome-icon></span></td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faTrash } from '@fortawesome/free-solid-svg-icons'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

  library.add(faTrash);

  export default {
    components: {
      fontAwesomeIcon: FontAwesomeIcon
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
        /*
          Initialize the form data
        */
        let formData = new FormData();

        /*
          Iteate over any file sent over appending the files
          to the form data.
        */
        for (var i = 0; i < this.files.length; i++) {
          let file = this.files[i];

          formData.append('files[' + i + ']', file);
        }

        /*
          Make the request to the POST /select-files URL
        */
        axios.post('/select-files',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then(function () {
          console.log('SUCCESS!!');
        })
          .catch(function () {
            console.log('FAILURE!!');
          });
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
      ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach( function( evt ) {
        /*
          For each event add an event listener that prevents the default action
          (opening the file in the browser) and stop the propagation of the event (so
          no other elements open the file in the browser)
        */
        this.$refs.fileform.addEventListener(evt, function(e){
          e.preventDefault();
          e.stopPropagation();
        }.bind(this), false);
      }.bind(this));

      /*
        Add an event listener for drop to the form
      */
      this.$refs.fileform.addEventListener('drop', function(e){
        /*
          Capture the files from the drop event and add them to our local files
          array.
        */
        for( let i = 0; i < e.dataTransfer.files.length; i++ ){
          this.files.push( e.dataTransfer.files[i] );
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

  form{
    display: block;
    width: 100%;
    height: 100%;
    min-height: 6em;
    margin: 40px auto auto;
    text-align: center;
    border: 0.2em dashed currentColor;
  }

  form:hover {
    border: 0.2em solid currentColor;
    cursor: pointer;
  }


</style>
