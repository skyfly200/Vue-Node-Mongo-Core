<template lang="pug">
  .register
    h1 Sign Up
    v-form.registration-form(@submit.prevent="login" v-model="valid")
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
  data: () => ({
    show: false,
    valid: false,
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
    login: function(e) {
      if (
        this.user.name &&
        this.user.email &&
        this.user.username &&
        this.user.password
      )
        console.log(this.user);
    }
  }
})
export default class Register extends Vue {}
</script>
