<template lang="pug">
  .login
    h1 Sign In
    v-form.login-form(@submit.prevent="login" v-model="valid")
      v-text-field( v-model="username"
        :rules="[rules.required]"
        label="Username"
        required)
      v-text-field(
        :append-icon="show ? 'visibility' : 'visibility_off'"
        :rules="[rules.required]"
        :type="show ? 'text' : 'password'"
        v-model="password"
        name="password"
        label="Password"
        class="input-group--focused"
        @click:append="show = !show")
      v-btn(type="submit") Login
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  data: () => ({
    show: false,
    valid: false,
    username: "",
    password: "",
    rules: {
      required: value => !!value || "Required."
    }
  }),
  methods: {
    login: function(e) {
      if (this.username && this.password)
        this.$http
          .post("http://localhost:1234/users/login", {
            username: this.username,
            password: this.password
          })
          .then(response => {
            if (response.data && response.data.auth) {
              // MUST be changed to store JWT in cookie for security!!!
              localStorage.setItem("jwt", response.data.token);
              if (localStorage.getItem("jwt") != null) {
                this.$emit("loggedIn");
                if (this.$route.params.nextUrl != null) {
                  this.$router.push(this.$route.params.nextUrl);
                } else {
                  this.$router.push("dashboard");
                }
              }
            } else {
              console.log("Auth failed");
            }
          })
          .catch(function(error) {
            console.error(error);
          });
    }
  }
})
export default class Login extends Vue {}
</script>
