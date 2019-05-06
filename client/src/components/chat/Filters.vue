<template lang="pug">
  v-expansion-panel(v-model="show")
    v-expansion-panel-content
      v-flex(px-3)
        .filters-types
          h5 Types
          v-checkbox(v-model="filters.direct" @change="$emit('filter', filters)" label="Direct" hide-details)
          v-checkbox(v-model="filters.group" @change="$emit('filter', filters)" label="Group" hide-details)
        v-divider
        v-switch(v-model="filters.created" @change="$emit('filter', filters)" label="Your Created Only" height="28px" hide-details)
        v-switch(v-model="filters.unread" @change="$emit('filter', filters)" label="Unread Only" height="28px" hide-details)
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: ["show"],
  data: function() {
    return {
      filters: {
        direct: true,
        group: true,
        created: false,
        unread: false
      }
    }
  }
})
export default class Filters extends Vue {}
</script>
<style lang="sass" scoped>
  .filters-types
    display: flex
    justify-content: center
    padding-bottom: 1em
</style>
