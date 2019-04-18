<template lang="pug">
v-container(fluid grid-list-md).dashboard
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
  v-layout.layout
    v-flex.heading
      h1 Welcome to the dashboard {{ username }}
    v-flex.body
      v-card.buttons
        v-btn(primary to="/profile")
          v-icon person
          span Your Profile
        v-btn(primary to="/password")
          v-icon lock
          span Change Password
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      dialog: false,
      dialogMessage: "",
      snackbar: false,
      snackbarMessage: "",
      snackbarTimeout: 5000
    };
  },
  computed: {
    username: function() {
      return this.$store.getters.user.username;
    }
  },
  created() {
    this.dialog =
      this.$store.getters.isLoggedIn && !this.$store.getters.user.active;
  },
  methods: {
    resend: function() {
      // send a new verification email
      this.$http({
        url: "http://localhost:1234/users/resend/" + this.username,
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
};
</script>

<style lang="sass" scoped>
.layout
  display: flex
  flex-direction: column
.flex
  display: flex
  justify-content: center
.buttons
  display: flex
  flex-direction: column
  padding: 1em
  .v-btn
    margin: 1em auto
    width: 200px
</style>
