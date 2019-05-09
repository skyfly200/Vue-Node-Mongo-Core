<template lang="pug">
v-container(fluid grid-list-md).admin-dashboard
  v-layout.layout
    v-flex.heading
      h1 Welcome to the admin portal {{ username }}
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
export default class Admin extends Vue {}
</script>

<style lang="sass" scoped>
.layout
  display: flex
  flex-direction: column
.flex
  display: flex
  justify-content: center
</style>
