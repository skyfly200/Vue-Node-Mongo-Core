<template lang="pug">
v-container(fluid grid-list-md).profile
  v-layout.layout
    v-flex.heading
      h1 {{ titleCase(username) }}'s Profile
    v-flex.body
      h3 Joined: {{ user.joined }}
      h3 Name: {{ user.name }}
      h3 Groups:
      ul
        li(v-for="group in user.groups") {{ group }}
      h3 Profile Info:
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
.flex
  display: flex
  flex-direction: column
  justify-content: center
  text-align: center
</style>
