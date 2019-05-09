<template lang="pug">
#nav
  v-navigation-drawer(app v-model="drawer")
    v-list.pa1
      v-list-tile(avatar v-if='isLoggedIn')
        v-list-tile-avatar
          v-img(src="https://randomuser.me/api/portraits/men/85.jpg")
        v-list-tile-content
          v-list-tile-title {{ username }}
            .logout
              v-btn(flat small @click='logout') Logout
      v-divider
      v-list-tile
        v-list-tile-content
          v-list-tile-title sub-title
  v-toolbar(app scroll-off-screen)
    v-toolbar-side-icon(@click="drawer = !drawer")
    v-toolbar-title.headline.text-uppercase
      span PWA Core
      span.font-weight-light Vue, Express, Mongo
    v-spacer
    v-toolbar-items#links.hidden-sm-and-down
      v-btn(flat small to='/') Home
      v-btn(flat small to='/about') About
      template(v-if='isLoggedIn')
        v-btn(flat small to='/groups') Groups
        v-btn(flat small to='/chat') Chat
        v-btn(flat small to='/dashboard') Dashboard
    v-divider(vertical)
    v-toolbar-items#user
      template(v-if='isLoggedIn')
        .user-img
          v-img(src="http://lorempixel.com/200/200/nature" width="40")
        .controls
          .welcome
            span Welcome&nbsp;
            router-link(to='/profile') {{ username }}
          .logout
            v-btn(flat small @click='logout') Logout
      template(v-else)
        .login
          v-btn(flat small to='/login') Login
        .register
          v-btn(flat small to='/register') Register
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  data: () => ({
    drawer: false
  }),
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    username: function() {
      return this.$store.getters.getUser.username;
    },
    img: function() {
      // Need to implement this getter and backend data flow
      //return this.$store.getters.getUser.img;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
})
export default class Nav extends Vue {}
</script>
<style lang="sass" scoped>
#links
  margin: auto 1em
#user
  margin-left: 24px
  display: flex
  align-items: center
  justify-content: center
  .user-img
    margin-right: 0.5em
    .v-image
      border-radius: 50%
  .controls
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
</style>
