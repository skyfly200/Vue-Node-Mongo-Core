<template lang="pug">
v-tooltip(:right="tooltip.right" :left="tooltip.left" :top="tooltip.top" :bottom="tooltip.bottom")
  template(v-slot:activator="{ on }")
    v-btn(@click="$emit('select')" icon small)
      v-icon edit
  span {{ tooltip.text }}
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: ["tooltip"]
})
export default class FabBtn extends Vue {}
</script>
<style lang="sass" scoped>
.d-flex
  display: flex
  justify-content: center
.chip-spacer
  margin: auto 50%
  width: 200px
</style>
