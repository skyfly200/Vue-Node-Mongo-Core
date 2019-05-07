<template lang="pug">
  .message
    v-avatar.avatar-left(v-if="!own")
      v-img(:src="avatar")
    .content
      .body {{ body }}
      span.author(v-if="showName") {{ author }}
      .timestamp(:class="{ right: !own }") {{ timestamp }}
    v-avatar.avatar-right(v-if="own")
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
  display: flex
  p
  margin: 0
  .content
    width: 100%
  .avatar-right
    margin-left: 10px
  .avatar-left
    margin-right: 10px
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
