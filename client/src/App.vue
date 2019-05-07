<template lang="pug">
v-app
  VerifyEmailDialog
  Nav
  v-content
    router-view
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import VerifyEmailDialog from "@/components/VerifyEmailDialog.vue";
import Nav from "@/components/Nav.vue";

@Component({
  components: { VerifyEmailDialog, Nav },
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
      this.dialog = this.$store.getters.isLoggedIn && !this.$store.getters.user.active;
    }
  }
})
export default class App extends Vue {}
</script>

<style lang="sass" scoped></style>
