<template lang="pug">
  v-list-tile.message
    v-list-tile-avatar(v-if="!own")
      v-img(:src="avatar")
    v-list-tile-content
      v-list-tile-sub-title.content
        .author(v-if="showName") {{ author }}
        .body {{ body }}
        .timestamp(:class="{ right: !own }") {{ timestamp }}
    v-list-tile-avatar(v-if="own")
      v-img(:src="avatar")
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: ["author", "avatar", "body", "timestamp", "own", "showName"]
})
export default class Message extends Vue {}
</script>
<style lang="sass" scoped>
.message
  padding: 7px 5px
  p
  margin: 0
  .body
    color: black
    padding: 7px
    background-color: #eee
    border-radius: 10px
  .timestamp
    font-size: 0.8em
  .right
    text-align: right
</style>
