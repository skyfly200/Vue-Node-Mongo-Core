<template lang="pug">
v-app
  v-toolbar(app='')
    v-toolbar-title.headline.text-uppercase
      span App Name
      span.font-weight-light Vue Powered
    v-spacer
    #nav
      router-link(to='/') Home
      |  |
      router-link(to='/about') About
      template(v-if='isLoggedIn')
        span  |
        router-link(to='/dashboard') Dashboard
    #user(v-if='isLoggedIn')
      span
        | Welcome&nbsp;
        router-link(to='/profile') {{ username }}
      v-btn(flat='')
        a(@click='logout') Logout
    div(v-else='')
      v-btn(flat='' small='' to='/login') Login
      v-btn(flat='' small='' to='/register') Register
  v-content
    v-container(fluid='')
      router-view
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  created: function() {
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
};
</script>

<style lang="sass" scoped>
#user
  margin-left: 3vw
</style>
