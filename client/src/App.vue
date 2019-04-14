<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>App Name</span>
        <span class="font-weight-light">Vue Powered</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
        <template v-if="isLoggedIn">
          <span> | </span>
          <router-link to="/dashboard">Dashboard</router-link>
        </template>
      </div>
      <div id="user" v-if="isLoggedIn">
        <span>
          Welcome
          <router-link to="/profile">{{ username }}</router-link>
        </span>
        <v-btn flat><a @click="logout">Logout</a></v-btn>
      </div>
      <div v-else>
        <v-btn flat small to="/login">Login</v-btn>
        <v-btn flat small to="/register">Register</v-btn>
      </div>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
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
