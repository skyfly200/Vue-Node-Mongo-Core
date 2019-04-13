<template lang="pug">
  .register
    h1 Sign Up
    v-form.registration-form(@submit.prevent="register" v-model="valid")
      v-text-field( v-model="user.name"
        :rules="[rules.required]"
        label="Name"
        required)
      v-text-field( v-model="user.username"
        :rules="[rules.required]"
        label="Username"
        required)
      v-text-field( v-model="user.email"
        :rules="[rules.required]"
        label="Email"
        required)
      v-text-field( v-model="user.homePhone"
        label="Home Phone")
      v-text-field( v-model="user.cellPhone"
        label="Cell Phone")
      v-text-field(
        :append-icon="show ? 'visibility' : 'visibility_off'"
        :rules="[rules.required]"
        :type="show ? 'text' : 'password'"
        v-model="user.password"
        name="password"
        label="Password"
        class="input-group--focused"
        @click:append="show = !show")
      v-text-field(
        :rules="[rules.required]"
        :type="show ? 'text' : 'password'"
        v-model="user.passwordConf"
        name="password-conf"
        label="Password Confirmation"
        class="input-group--focused")
      v-btn(type="submit") Login
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: ["nextUrl"],
  data: () => ({
    show: false,
    valid: false,
    error: "",
    user: {
      name: "",
      username: "",
      password: "",
      passwordConf: "",
      email: "",
      homePhone: "",
      cellPhone: ""
    },
    rules: {
      required: value => !!value || "Required."
    }
  }),
  methods: {
    register: function(e) {
      if (
        this.user.name &&
        this.user.email &&
        this.user.username &&
        this.user.password &&
        this.user.passwordConf
      ) {
        if (this.user.password === this.user.passwordConf) {
          // POST http request
          this.$http
            .post("http://localhost:1234/users/new", {
              name: this.name,
              username: this.username,
              email: this.email,
              password: this.password,
              homePhone: this.homePhone,
              cellPhone: this.cellPhone
            })
            .then(response => {
              // MUST be changed to store JWT in cookie for security!!!
              localStorage.setItem("jwt", response.data.token);

              if (localStorage.getItem("jwt") != null) {
                this.$emit("loggedIn");
                if (this.$route.params.nextUrl != null) {
                  this.$router.push(this.$route.params.nextUrl);
                } else {
                  this.$router.push("/");
                }
              }
            })
            .catch(error => {
              console.error(error);
            });
          console.log(this.user);
        } else {
          this.error = "Passwords do not match";
        }
      } else {
        this.error = "Missing a required field";
      }
    }
  }
})
export default class Register extends Vue {}
</script>
