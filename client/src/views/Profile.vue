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
    user: {}
  }),
  computed: {
    username: function() {
      return this.$store.getters.user.username;
    }
  },
  created() {
    let id = this.$route.params.id ? this.$route.params.id : this.username;
    this.getProfile(id);
  },
  methods: {
    titleCase: function(string) {
      if (string) return string.charAt(0).toUpperCase() + string.slice(1);
      else return "";
    },
    getProfile: function(username) {
      this.user = {
        joined: new Date(),
        name: "Users Name",
        groups: ["Group 111"],
        profile: [
          { title: "Favorite Color", value: "Purple" },
          { title: "Nickname", value: "Mad Max" },
          { title: "Favorite Genera", value: "Rock" }
        ]
      };
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
