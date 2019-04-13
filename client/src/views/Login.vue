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
      div.error {{ error }}
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  data: () => ({
    show: false,
    valid: false,
    error: "",
    username: "",
    password: "",
    rules: {
      required: value => !!value || "Required."
    }
  }),
  methods: {
    login: function(e) {
      if (this.username && this.password) {
        this.error = "";
        this.$store
          .dispatch("login", {
            username: this.username,
            password: this.password
          })
          .then(response => {
            if (response.data) {
              if (response.data.auth && response.data.token) {
                if (this.$route.params.nextUrl != null) {
                  this.$router.push(this.$route.params.nextUrl);
                } else {
                  this.$router.push("/dashboard");
                }
              } else {
                this.error = response.data.err;
              }
            } else {
              this.error = "Auth failed";
            }
          })
          .catch(err => console.log(err));
      } else {
        this.error = "All fields are required";
      }
    }
  }
})
export default class Login extends Vue {}
</script>
