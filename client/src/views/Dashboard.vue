<template lang="pug">
v-container(fluid).dashboard
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
          EditableField(title="Username" :v="username" icon="person").account-field.username
          v-divider
          EditableField(title="Email" :v="user.email" icon="email").account-field.email
          v-divider
          EditableField(title="Phone" :v="user.phone" icon="phone").account-field.phone
          v-divider
          br
          v-btn(primary to="/password").password-btn
            v-icon(left) lock
            span Change Password
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import FabBtn from "@/components/FabBtn.vue";
import EditableField from "@/components/EditableField.vue";

@Component({
  components: { FabBtn, EditableField },
  data: () => ({
    user: {
      email: "user@example.com",
      phone: "720-555-5555"
    },
  }),
  computed: {
    username: function() {
      return this.$store.getters.getUser.username;
    }
  },
  created() {
    // load user info
    //this.getUser(this.username);
  },
  methods: {
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
  padding-right: 1em
  .v-card__text
    display: flex
    flex-direction: column
  .v-btn
    width: strech
.settings
  .password-btn
    margin-left: auto
  .v-card__text
    display: flex
    flex-direction: column
.v-btn
  width: fit-content
</style>
