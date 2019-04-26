<template lang="pug">
v-hover
  .mx-auto(slot-scope='{ hover }')
    v-img(:src="src" :width="width")
      v-expand-transition
        .d-flex.transition-fast-in-fast-out.black.v-card--reveal.display-3(v-if='hover' style='height: 100%;')
          .chip-spacer(@click="$emit('open')")
            v-chip(outline color="white").edit-img-chip
              v-avatar
                v-icon.edit-img photo_camera
              | Edit
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: ["src", "width"]
})
export default class ImgEditHover extends Vue {}
</script>
<style lang="sass" scoped>
.d-flex
  display: flex
  justify-content: center
.chip-spacer
  margin: auto 50%
  width: 200px
</style>
