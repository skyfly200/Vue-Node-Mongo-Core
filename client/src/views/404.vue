<template lang="pug">
v-container(fluid grid-list-md).error-404
  v-layout.layout
    v-flex.heading
      h1 404
      h2 Page not found
    v-flex.body
      .home-link
        v-btn(to="/") Back to Home
      h4 Email webmaster about broken links
      a(:href="'mailto:' + email")
        h4 {{ email }}
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  data: () => ({
    email: "webmaster@example.com"
  })
})
export default class Error404 extends Vue {}
</script>

<style lang="sass" scoped>
.heading
  margin: 10%
.body
  display: flex
  justify-content: center
  .v-btn
    width: 200px
    margin: 50px 0
.layout
  display: flex
  flex-direction: column
  text-align: center
.flex
  display: flex
  justify-content: center
  flex-direction: column
</style>
