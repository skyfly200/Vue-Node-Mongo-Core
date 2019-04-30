<template lang="pug">
v-dialog(v-model="toggle").image-upload-dialog
  v-card
    v-card-title(class="headline") Upload a new {{ type }} image
    v-card-text
      .uploader(v-if="noFiles")
        input.file-input(type="file" accept="image/*" ref="fileInput" :multiple="multi" @change="select")
        form.drop-zone(v-if="dragAndDropCapable" ref="dropZone" :class="{ dragging: dragging }")
          v-icon image
          p Drag and drop here
          span or
          br
          v-btn.browse-btn(@click="$refs.fileInput.click()" color="primary") Choose a file
          h4 {{ sizeLimit }}MB size limit
        .browse-only(v-else)
          v-btn.browse-btn(@click="$refs.fileInput.click()" color="primary") Choose a file
          h4 {{ sizeLimit }}MB size limit
        v-alert(:value="error" type="error") {{ message }}
      .image-preview(v-else)
        v-img(v-for="f in fileUrls" :src="f" width="200px")
        v-btn(@click="clear") Clear
        v-alert(:value="error" type="error") {{ message }}
    v-card-actions
      v-spacer
      v-btn(@click="closeDialog") Close
      v-btn(:disabled="noFiles" @click="upload") Save
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: ["type", "toggle", "multi"],
  data: () => ({
    reader: new FileReader(),
    files: [],
    fileUrls: [],
    dragAndDropCapable: false,
    dragging: false,
    types: ["image.*"],
    message: "",
    error: false,
    sizeLimit: 10 // in MB
  }),
  mounted(){
    this.dragAndDropCapable = this.determineDragAndDropCapable();
  },
  updated(){
    // wait until the entire view has been rendered
    this.$nextTick(() => {
      if( this.dragAndDropCapable && this.$refs.dropZone ){
        this.register();
      }
    });
  },
  computed: {
    noFiles: function() {
      return this.files.length < 1;
    }
  },
  methods: {
    register: function() {
      // bind an event listener to all of the drag events
      ['drag', 'dragstart'].forEach( function( evt ) {
        this.$refs.dropZone.addEventListener(evt, function(e){
          e.preventDefault();
          e.stopPropagation();
        }.bind(this), false);
      }.bind(this));
      ['dragover', 'dragenter'].forEach( function( evt ) {
        this.$refs.dropZone.addEventListener(evt, function(e) {
          e.preventDefault();
          e.stopPropagation();
          this.dragging = true;
          e.dataTransfer.dropEffect = "copy";
        }.bind(this));
      }.bind(this), false);
      ['dragleave', 'dragend'].forEach( function( evt ) {
        this.$refs.dropZone.addEventListener(evt, function(e) {
          e.preventDefault();
          e.stopPropagation();
          this.dragging = false;
        }.bind(this));
      }.bind(this), false);
      this.$refs.dropZone.addEventListener('drop', function(e){
        if (this.dragging) {
          e.preventDefault();
          e.stopPropagation();
          this.dragging = false;
          for( let i = 0; i < e.dataTransfer.files.length; i++ ){
            this.load(e.dataTransfer.files[i]);
          }
        }
      }.bind(this));
    },
    select: function(e) {
      var fileList = e.target.files;
      this.clear();
      for (var i=0; i<fileList.length; i++) {
        this.load(fileList[i]);
      }
    },
    load: function(file) {
      // || TODO || show spinning loader here to improve UX
      // Check file against type and size constraints
      if (!this.checkType(file)) {
        this.message = "Invalid File Type";
        this.error = true;
      } else if (!this.checkSize(file)) {
        this.message = "Oversized File";
        this.error = true;
      } else {
        this.files.push(file);
        this.show(file);
      }
    },
    show: function(file) {
      var reader = new FileReader();
      // Register file reader events
      reader.onload = (cb => { return e => {cb(e.target.result)} })(result => {
        this.fileUrls.push(result)
      } );
      reader.onerror = (cb => { return e => {cb(e.target.error)} })(error => {this.message = error; this.error = true;} );
      // Call reader with file
      reader.readAsDataURL(file);
    },
    determineDragAndDropCapable(){
      var div = document.createElement('div');
      return ( ( 'draggable' in div ) || ( 'ondragstart' in div && 'ondrop' in div ) )
              && 'FormData' in window && 'FileReader' in window;
    },
    checkType: function(file) {
      if (!file.type) return false;
      for (let t in this.types) if (file.type.match(this.types[t])) return true;
      return false;
    },
    checkSize: function(file) {
      return !!file.size || file.size <= (this.sizeLimit * 1048576);
    },
    clear: function() {
      this.files = [];
      this.fileUrls = [];
      this.message = "";
      this.error = false;
    },
    upload: function() {
      // upload selected files and show progress
      // || REFRENCE || File API, Axios, Vuetify Loader
      // Display upload Error message
      // this.message = "Error Uploading";
      // this.error = true;
      // emit done event, passing the upload result & clear data
      // this.$emit("done");
      this.clear();
    },
    closeDialog: function() {
      this.$emit("close");
      this.clear();
    }
  }
})
export default class ImgUpload extends Vue {}
</script>
<style lang="sass">
.uploader
  display: flex
  justify-content: center
  flex-direction: column
  h3
    text-align: center
    margin: 10px
.drop-zone
  border: 2px dashed #bbb
  border-radius: 5px
  padding: 25px
  text-align: center
  color: #bbb
.dragging
  background-color: grey
.browse-only
  text-align: center
.file-input
  display: none
.browse-btn
  margin: 1.5em auto
.v-alert
  width: 100%
</style>
