<template lang="pug">
v-container(fluid grid-list-md).password
  v-layout.layout
    v-flex.heading
      h1 Change Password
    v-flex.form
      v-form.password-form(@submit.prevent="submit" v-model="valid")
        v-text-field(
          v-if="isLoggedIn"
          :append-icon="show ? 'visibility' : 'visibility_off'"
          :rules="[rules.required]"
          :type="show ? 'text' : 'password'"
          v-model="oldPassword"
          name="old-password"
          label="Old Password"
          class="input-group--focused"
          @click:append="show = !show")
        v-text-field(
          :append-icon="show ? 'visibility' : 'visibility_off'"
          :rules="[rules.required]"
          :type="show ? 'text' : 'password'"
          v-model="password"
          name="password"
          label="New Password"
          class="input-group--focused"
          @click:append="show = !show")
        v-text-field(
          :append-icon="show ? 'visibility' : 'visibility_off'"
          :rules="[rules.required]"
          :type="show ? 'text' : 'password'"
          v-model="passwordConf"
          name="password-conf"
          label="New Password Confirmation"
          class="input-group--focused"
          @click:append="show = !show")
        v-btn(type="submit") Submit
        div.error {{ error }}
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  data: () => ({
    token: "",
    show: false,
    valid: false,
    error: "",
    oldPassword: "",
    password: "",
    passwordConf: "",
    rules: {
      required: value => !!value || "Required."
    }
  }),
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    username: function() {
      return this.$store.getters.getUser.username;
    }
  },
  methods: {
    submit: function(e) {
      if (this.oldPassword && this.password && this.passwordConf) {
        if (this.password === this.passwordConf) {
          // Reset or Change
          // send password reset with token
          // send password change wih old password
        } else {
          this.error = "Passwords do not match";
        }
      } else {
        this.error = "All fields are required";
      }
    }
  }
})
export default class Password extends Vue {}
</script>

<style lang="sass" scoped>
.layout
  display: flex
  flex-direction: column
.flex
  display: flex
  justify-content: center
  form
    width: 500px
</style>
