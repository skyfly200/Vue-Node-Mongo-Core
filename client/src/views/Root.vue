<template lang="pug">
v-container(fluid grid-list-md).root-dashboard
  v-layout.layout
    v-flex.heading
      h1 Welcome to the root portal {{ username }}
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  computed: {
    username: function() {
      return this.$store.getters.getUser.username;
    }
  }
})
export default class Root extends Vue {}
</script>

<style lang="sass" scoped>
.layout
  display: flex
  flex-direction: column
.flex
  display: flex
  justify-content: center
</style>
