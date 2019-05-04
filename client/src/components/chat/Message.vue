<template lang="pug">
  v-list-tile.message
    v-list-tile-avatar(v-if="!own")
      v-img(:src="avatar")
    v-list-tile-content
      v-list-tile-sub-title
        .author(v-if="showName") {{ author }}
        .message-body {{ body }}
        .timestamp {{ timestamp }}
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
<style lang="sass" scoped></style>
