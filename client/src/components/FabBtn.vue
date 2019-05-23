<template lang="pug">
v-tooltip(:right="tooltip.right" :left="tooltip.left" :top="tooltip.top" :bottom="tooltip.bottom")
  template(v-slot:activator="{ on }")
    v-btn(@click="$emit('select')" fab :small="size === 'small'" :large="size === 'large'" :color="color || 'primary'" v-on="on")
      v-icon {{ icon }}
  span {{ tooltip.text }}
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: ["icon", "tooltip", "color", "size"]
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
