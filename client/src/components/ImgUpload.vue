<template lang="pug">
v-dialog(v-model="toggle").image-upload-dialog
  v-card
    v-card-title(class="headline") Upload a new {{ type }} image
    v-card-text
      .uploader(v-if="noFiles")
        .drop_zone Drag and drop {{ multi ? "images" : "image"}} here
        h3 or
        input(type="file" label="Browse images" :multiple="multi" @change="load" append-icon="photo_camera")
        h4 {{ sizeLimit }}MB max per image
        v-alert(:value="error" type="error") {{ message }}
      .image-preview(v-else)
        v-img(v-for="img in images" :src="img" width="200px")
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
    images: [],
    message: "",
    error: false,
    sizeLimit: 5 // in MB
  }),
  computed: {
    noFiles: function() {
      return this.images.length < 1;
    }
  },
  methods: {
    load: function(e) {
      var files = e.target.files;
      var reader = new FileReader();
      this.clear();
      for (var f in files) {
        let file = files[f];
        // Check file against type and size constraints
        if (file.type && !this.checkType(file)) {
          this.message = "Invalid File Type";
          this.error = true;
        } else if (file.size && !this.checkSize(file)) {
          this.message = "Oversized File";
          this.error = true;
        } else if (file.type && file.size) {
          // Setup file reader callback
          reader.onload = ( (cb) => {
            return (e) => { cb(e.target.result) };
          })(result => this.images.push(result));
          // Call reader with file
          reader.readAsDataURL(file);
        }
      }
    },
    checkType: function(file) {
      return file.type && file.type.match("image.*");
    },
    checkSize: function(file) {
      let byteSize = this.sizeLimit * 1048576;
      return file.size <= byteSize;
    },
    clear: function() {
      this.images = [];
      this.message = "";
      this.error = false;
    },
    upload: function() {
      // upload selected files and show progress
      // || IMPLEMENTATION REFRENCE || File API, Vuetify Loader
      // emit done event passing it a result
      //this.$emit("done");
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
