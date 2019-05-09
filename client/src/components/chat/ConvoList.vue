<template lang="pug">
  v-list(two-line).conversation-list
    v-slide-y-transition(group)
      template(v-for="(c, i) in conversations")
        v-divider(v-if="i > 0" :key="c.id + '-div'")
        ConvoTile(:c="c" :key="c.id" @select="$emit('select', c.id)" @delete="$emit('delete', c.id)")
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
import ConvoTile from "@/components/chat/ConvoTile.vue";

@Component({
  components: {ConvoTile},
  props: ["conversations"]
})
export default class ConvoList extends Vue {}
</script>
<style lang="sass" scoped>
.conversation-list
  height: 100%
</style>
