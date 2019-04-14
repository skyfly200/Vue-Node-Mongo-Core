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
      v-btn(type="submit") Register
      v-btn(to="/login") Login
      div.error {{ error }}
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
          let data = {
            name: this.user.name,
            username: this.user.username,
            email: this.user.email,
            password: this.user.password,
            homePhone: this.user.homePhone,
            cellPhone: this.user.cellPhone
          };
          this.$store
            .dispatch("register", data)
            .then(response => {
              if (response.data.message) {
                this.$router.push("/login");
              } else if (response.data.err) {
                this.error = response.data.err;
              } else {
                this.error = "Registration failed";
              }
            })
            .catch(err => console.error(err));
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
