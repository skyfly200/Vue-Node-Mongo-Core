<template lang="pug">
v-dialog(v-model="view").image-upload-dialog
  v-card
    v-card-title(class="headline") Upload a new {{ type }} image
    v-card-text
      .uploader
        .drop_zone Drag and drop images here
        h3 or
        input(type="file" label="Browse for images" @change="loadImg" append-icon="photo_camera")
      .image-preview
        v-img(v-for="img in images" :src="img" width="200px")
    v-card-actions
      v-btn(@click="view = false") Close
      v-btn Save
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: ["type", "view"],
  data: () => ({
    images: []
  }),
  methods: {
    loadImg: function(e) {
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
.image-upload-dialog
  text-align: center
.drop_zone
  border: 2px dashed #bbb
  border-radius: 5px
  padding: 25px
  text-align: center
  color: #bbb
</style>
