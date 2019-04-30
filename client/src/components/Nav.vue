<template lang="pug">
v-toolbar(app)
  v-toolbar-title.headline.text-uppercase
    span App Name
    span.font-weight-light Vue Powered
  v-spacer
  #nav
    router-link(to='/') Home
    |  |&nbsp;
    router-link(to='/about') About
    template(v-if='isLoggedIn')
      span  |&nbsp;
      router-link(to='/dashboard') Dashboard
  #user(v-if='isLoggedIn')
    span
      | Welcome&nbsp;
      router-link(to='/profile') {{ username }}
    v-btn(flat)
      a(@click='logout') Logout
  div(v-else)
    v-btn(flat small to='/login') Login
    v-btn(flat small to='/register') Register
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    username: function() {
      return this.$store.getters.user.username;
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
#user
  margin-left: 3vw
</style>
