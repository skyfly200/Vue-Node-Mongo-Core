<template lang="pug">
  .login
    h1 Login
    v-form.login-form(@onSubmit="submit" v-model="valid")
      v-text-field( v-model="username"
        :rules="usernameRules"
        label="Username"
        required)
      v-text-field( v-model="password"
        :rules="passwordRules"
        label="Password"
        required)
      v-btn(@click="submit") Submit
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  data: () => ({
    valid: false,
    username: "",
    usernameRules: [v => !!v || "Username is required"],
    password: "",
    passwordRules: [v => !!v || "Password is required"]
  }),
  methods: {
    submit: () => {
      console.log("Submit");
    }
  }
})
export default class Home extends Vue {}
</script>
