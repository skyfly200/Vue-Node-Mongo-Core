<template lang="pug">
v-dialog(v-model="toggle").image-upload-dialog
  v-card
    v-card-title(class="headline") Upload a new {{ type }} image
    v-card-text
      .uploader(v-if="images.length < 1")
        .drop_zone Drag and drop {{ multi ? "images" : "image"}} here
        h3 or
        input(type="file" label="Browse images" :multiple="multi" @change="loadImages" append-icon="photo_camera")
      .image-preview(v-else)
        v-img(v-for="img in images" :src="img" width="200px")
        v-btn(@click="clearImages") Clear
    v-card-actions
      v-spacer
      v-btn(@click="closeDialog") Close
      v-btn(:disabled="images.length < 1" @click="uploadImages") Save
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: ["type", "toggle", "multi"],
  data: () => ({
    images: []
  }),
  methods: {
    loadImages: function(e) {
      var files = e.target.files;
      var reader = new FileReader();
      this.images = [];
      for (var f in files) {
        let file = files[f];
        // Only process image files.
        if (file.type && file.type.match("image.*")) {
          reader.onload = (function(cb) {
            return function(e) {
              cb(e.target.result);
            };
          })(result => this.images.push(result));

          reader.readAsDataURL(file);
        }
      }
    },
    clearImages: function() {
      this.images = [];
    },
    uploadImages: function() {
      // upload selected images
      // show alert with response
    },
    closeDialog: function() {
      this.images = [];
      this.$emit("close");
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
</style>
