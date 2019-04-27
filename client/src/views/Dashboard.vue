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
    v-divider
    v-flex.body
      v-card.links
        v-card-title
          h3 Quick Links
        v-card-text
          v-btn(primary to="/profile")
            v-icon(left) person
            span Profile
          v-btn(primary to="/chat")
            v-icon(left) message
            span Chat
          v-btn(primary to="/groups")
            v-icon(left) group
            span Groups
      v-card.settings
        v-card-title
          h3 Account Setting
        v-card-text
          .account-field.username
            span {{ username }}
            v-tooltip(right).edit-btn
              template(v-slot:activator="{ on }")
                v-btn(fab small color="primary" v-on="on")
                  v-icon person
              span Change Username
          v-btn(primary)
            v-icon(left) email
            span Change Email
          v-btn(primary)
            v-icon(left) phone
            span Change Phone
          v-btn(primary to="/password")
            v-icon(left) lock
            span Change Password
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      user: {},
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
    // load user info
    this.getProfile(this.username);
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
    },
    getProfile: function(username) {
      this.$http({
        url: "http://localhost:1234/users/profile/" + username,
        data: { username: username },
        method: "GET"
      })
        .then(resp => {
          if (resp.data.err) {
            console.error(resp.data.err);
          } else {
            this.user = resp.data;
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
  justify-content: space-around
.body
  margin-top: 25px
  flex-wrap: wrap
.links
  padding: 1em
  .v-card__text
    display: flex
    flex-direction: column
  .settings .v-card__text
    display: flex
    flex-direction: column
</style>
