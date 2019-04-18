<template lang="pug">
v-app
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
  v-dialog(v-model='dialog' max-width='290')
    v-card
      v-card-title.headline Please verify your email
      v-card-text You must verify your email to activate your account
      v-card-actions
        v-spacer
        v-btn(color='green darken-1' flat @click='resend') Resend Email
        v-btn(color='blue darken-1' flat @click='dialog = false') Close
  v-content
    v-container(fluid='')
      router-view
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      dialog: false
    };
  },
  created: function() {
    this.$store.dispatch("load_session", {
      token: localStorage.getItem("token"),
      user: JSON.parse(localStorage.getItem("user"))
    });
    this.dialog = !this.$store.getters.user.active;
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
    },
    resend: function() {
      // send a new verification email
      this.dialog = false;
    }
  }
};
</script>

<style lang="sass" scoped>
#user
  margin-left: 3vw
</style>
