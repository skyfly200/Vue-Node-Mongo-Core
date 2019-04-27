<template lang="pug">
v-container(fluid).dashboard
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
  v-layout.heading
    h1 Welcome to the dashboard {{ username }}
  v-divider
  v-layout(row).body
    v-flex(shrink).links.card
      v-card
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
    v-flex(grow).settings.card
      v-card
        v-card-title
          h3 Account Setting
        v-card-text
          .account-field.username
            .field-value
              h4 Username:&nbsp;
              span {{ username }}
            v-spacer
            FabBtn(:tooltip="{text: 'Change Username', left: true}" icon="person").edit-btn
          v-divider
          .account-field.email
            .field-value
              h4 Email:&nbsp;
              span {{ user.email }}
            v-spacer
            FabBtn(:tooltip="{text: 'Change Email', left: true}" icon="email").edit-btn
          v-divider
          .account-field.phone
            .field-value
              h4 Phone:&nbsp;
              span {{ user.phone }}
            v-spacer
            FabBtn(:tooltip="{text: 'Change Phone', left: true}" icon="phone").edit-btn
          v-divider
          br
          v-btn(primary to="/password")
            v-icon(left) lock
            span Change Password
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import FabBtn from "@/components/FabBtn.vue";
import VerifyEmailDialog from "@/components/VerifyEmailDialog.vue";

@Component({
  components: { FabBtn, VerifyEmailDialog },
  data: () => ({
    user: {
      email: "user@example.com",
      phone: "720-555-5555"
    },
    dialog: false,
    dialogMessage: "",
    snackbar: false,
    snackbarMessage: "",
    snackbarTimeout: 5000
  }),
  computed: {
    username: function() {
      return this.$store.getters.user.username;
    }
  },
  created() {
    this.dialog =
      this.$store.getters.isLoggedIn && !this.$store.getters.user.active;
    // load user info
    //this.getUser(this.username);
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
    getUser: function(username) {
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
})
export default class Dashboard extends Vue {}
</script>

<style lang="sass" scoped>
.body
  margin-top: 25px
.links
  padding: 1em
  .v-card__text
    display: flex
    flex-direction: column
  .v-btn
    width: fill-available
.settings
  .v-card__text
    display: flex
    flex-direction: column
.v-btn
  width: fit-content
.account-field, .field-value
  display: flex
.field-value
  margin: auto
</style>
