<template lang="pug">
v-dialog(v-model="view").image-upload-dialog
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
      v-btn(@click="view = false") Close
      v-btn Save
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: ["type", "view", "multi"],
  data: () => ({
    images: []
  }),
  methods: {
    clearImages: function() {
      this.images = [];
    },
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
    openImageDialog: function(type) {
      this.imageDialog = true;
      this.imageDialogType = type;
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
