<template lang="pug">
v-container(fluid grid-list-md).register
  v-layout.layout
    v-flex.heading
      h1 Sign Up
    v-flex.form
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
        v-text-field( v-model="user.phone"
          label="Phone")
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
      phone: ""
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
            phone: this.user.phone
          };
          this.$store
            .dispatch("register", data)
            .then(response => {
              if (response.data.message) {
                if (this.$route.params.redirect != null) {
                  this.$router.push("/login/" + this.$route.params.redirect);
                } else {
                  this.$router.push("/login");
                }
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

<style lang="sass" scoped>
.layout
  display: flex
  flex-direction: column
.flex
  display: flex
  justify-content: center
  form
    width: 750px
</style>
