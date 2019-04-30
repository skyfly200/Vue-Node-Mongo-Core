<template lang="pug">
v-container(fluid grid-list-md).groups
  v-layout.layout
    v-flex.heading
      h1 Find Groups to Join
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Groups extends Vue {}
</script>

<style lang="sass" scoped>
.layout
  display: flex
  flex-direction: column
.flex
  display: flex
  justify-content: center
</style>
