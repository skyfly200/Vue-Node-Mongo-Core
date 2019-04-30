<template lang="pug">
v-dialog(v-model="toggle").file-upload-dialog
  v-card
    v-card-title(class="headline") Upload {{ multi ? "files" : "a file"}}
    v-card-text
      .uploader(v-if="noFiles")
        .drop_zone Drag and drop {{ multi ? "files" : "a file"}} here
        p or
        input(type="file" label="Browse files" :multiple="multi" @change="load" append-icon="photo_camera")
        h4 {{ sizeLimit }}MB {{ multi ? "max per file" : "max"}}
        v-alert(:value="error" type="error") {{ message }}
      .file-preview(v-else)
        h3 Selected Files
        ul
          li(v-for="f in files") {{ f }}
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
  props: ["types", "toggle", "multi"],
  data: () => ({
    files: [],
    message: "",
    error: false,
    sizeLimit: 10 // in MB
  }),
  computed: {
    noFiles: function() {
      return this.files.length < 1;
    }
  },
  methods: {
    load: function(e) {
      // || TODO || show spinning loader here to improve UX
      var fileList = e.target.files;
      var reader = new FileReader();
      this.clear();
      for (var f in fileList) {
        let file = fileList[f];
        // Check file against type and size constraints
        if (file.type && !this.checkType(file)) {
          this.message = "Invalid File Type";
          this.error = true;
        } else if (file.size && !this.checkSize(file)) {
          this.message = "Oversized File";
          this.error = true;
        } else if (file.type && file.size) {
          // Register file reader events
          reader.onload = (cb => { return e => {cb(e.target.result)} })(result => this.files.push(result) );
          reader.onerror = (cb => { return e => {cb(e.target.error)} })(error => {this.message = error; this.error = true;} );
          // Call reader with file
          reader.readAsDataURL(file);
        }
      }
    },
    checkType: function(file) {
      let validType;
      for (let t in this.types) validType = validType || file.type && file.type.match(this.types[t]);
      return validType;
    },
    checkSize: function(file) {
      let byteSize = this.sizeLimit * 1048576;
      return file.size <= byteSize;
    },
    clear: function() {
      this.files = [];
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
  input
    margin: 25px auto
.drop_zone
  border: 2px dashed #bbb
  border-radius: 5px
  padding: 25px
  text-align: center
  color: #bbb
.v-alert
  width: 100%
</style>
