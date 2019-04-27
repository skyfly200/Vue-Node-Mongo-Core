<template lang="pug">
v-app
  VerifyEmailDialog
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
  v-content
    router-view
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import VerifyEmailDialog from "@/components/VerifyEmailDialog.vue";

@Component({
  components: { VerifyEmailDialog },
  created: function() {
    this.$store.dispatch("load_session", {
      token: localStorage.getItem("token"),
      user: JSON.parse(localStorage.getItem("user"))
    });
    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function(resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout");
          resolve();
        }
        reject(err);
      });
    });
  },
  watch: {
    $route(to, from) {
      this.dialog = !this.$store.getters.user.active;
    }
  },
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
export default class App extends Vue {}
</script>

<style lang="sass" scoped>
#user
  margin-left: 3vw
</style>
