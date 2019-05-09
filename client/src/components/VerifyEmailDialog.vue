<template lang="pug">
.verify-email
  v-dialog(v-model='dialog' max-width='290')
    v-card
      v-card-title.headline Please verify your email
      v-card-text You must verify your email to activate your account
      v-card-actions
        v-spacer
        v-btn(color='green darken-1' flat @click='resend') Resend Email
        v-btn(color='blue darken-1' flat @click='dialog = false') Close
  v-snackbar(v-model="snackbar" right :timeout="snackbarTimeout")
    | {{ snackbarMessage }}
    v-btn(flat @click="snackbar = false") Close
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: [],
  data: () => ({
    dialog: false,
    dialogMessage: "",
    snackbar: false,
    snackbarMessage: "",
    snackbarTimeout: 5000
  }),
  created() {
    this.dialog =
    this.$store.getters.isLoggedIn && !this.$store.getters.getUser.active;
  },
  methods: {
    resend: function() {
      // send a new verification email
      this.$http({
        url: "http://localhost:1234/users/resend/" + this.$store.getters.getUser.username,
        data: { username: this.username },
        method: "GET"
      })
        .then(resp => {
          if (resp.data.err) {
            console.error(resp.data.err);
          } else {
            this.dialog = false;
            this.snackbar = true;
            this.snackbarMessage = "Email Sent";
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
})
export default class VerifyEmailDialog extends Vue {}
</script>
<style lang="sass" scoped></style>
