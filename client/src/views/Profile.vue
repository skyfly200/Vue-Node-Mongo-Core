<template lang="pug">
v-container(fluid grid-list-md).profile
  v-layout.layout
    v-flex.heading
      v-card
        .header-image
          img(src="http://lorempixel.com/800/200/abstract")
        .header-body
          .profile-image
            img(src="http://lorempixel.com/200/200/abstract")
          .profile-info
            h1 {{ titleCase(username) }}
            h3 Name: {{ user.name }}
            h3 Joined: {{ user.joined }}
    v-flex.body
      v-card.bio.section
        v-card-title
          h3 Bio
        v-card-text
          p {{ user.bio }}
      v-card.groups.section(v-if="user.groups")
        v-card-title
          h3 Groups:
        v-card-text
          ul
            li(v-for="group in user.groups") {{ group }}
      v-card.fields.section
        v-card-title
          h3 Profile Info
        v-card-text
          p(v-for="field in user.profile") {{ field.title }}: {{ field.value }}
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  data: () => ({
    user: {},
    username: ""
  }),
  watch: {
    $route(to, from) {
      this.username = this.$route.params.username
        ? this.$route.params.username
        : this.$store.getters.user.username;
      this.getProfile(this.username);
    }
  },
  created() {
    this.username = this.$route.params.username
      ? this.$route.params.username
      : this.$store.getters.user.username;
    this.getProfile(this.username);
  },
  methods: {
    titleCase: function(string) {
      if (string) return string.charAt(0).toUpperCase() + string.slice(1);
      else return "";
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
})
export default class Profile extends Vue {}
</script>

<style lang="sass" scoped>
.layout
  display: flex
  flex-direction: column
  justify-content: center
.header-image img
  width: 100%
.header-body
  display: flex
  justify-content: left
  .profile-image
    margin: 1em
  .profile-info
    margin: 2em
.body
  display: flex
  justify-content: center
  .section
    padding: 1em
    width: 100%
    margin: 1em
    display: flex
    flex-direction: column
    justify-content: center
    .v-card__text
      height: 100%
  .bio
    flex: 1 100%
</style>
