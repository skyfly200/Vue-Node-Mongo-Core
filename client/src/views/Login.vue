<template lang="pug">
  .login
    h1 Sign In
    v-form.login-form(@submit.prevent="submit" v-model="valid")
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
    submit: () => {
      console.log("Submit");
    }
  }
})
export default class Home extends Vue {}
</script>
