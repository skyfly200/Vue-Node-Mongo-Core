<template lang="pug">
v-container(fluid grid-list-md).profile
  v-layout.layout
    ImgUpload(:type="imageDialogType" v-on:close="imageDialog = false" :toggle="imageDialog" :multi="false")
    v-flex.heading
      v-card(color='grey lighten-4')
        .header-image
          v-hover
            .mx-auto(slot-scope='{ hover }')
              v-img(src='http://lorempixel.com/800/200/abstract')
                ImgEditHover(v-if="ownProfile" :hover="hover" v-on:open="openImageDialog('header')")
        .header-body
          .profile-image
            v-hover
              .mx-auto(slot-scope='{ hover }')
                v-img(width='200px' src='http://lorempixel.com/200/200/abstract')
                  ImgEditHover(v-if="ownProfile" :hover="hover" v-on:open="openImageDialog('profile')")
          .profile-info
            h1 {{ titleCase(user.name) }}
            h3 Username: {{ username }}
            h3 Joined: {{ dateJoined }}
    v-flex.sections
      v-card.bio.section(color='grey lighten-4')
        v-card-title
          h2 Bio
        v-card-text
          .section-view(v-if="!edit.bio")
            p {{ user.bio }}
          .section-edit(v-else)
            v-form
              v-textarea(name="bio" label="Bio" :value="user.bio")
              v-btn(@click="edit.bio = false") Cancel
              v-btn(@click="") Save
        v-card-actions(v-if="ownProfile && !edit.bio")
          v-spacer
          v-btn(@click="edit.bio = true" fab dark small color="primary")
            v-icon edit
      v-card.fields.section(color='grey lighten-4')
        v-card-title
          h2 Profile Info
        v-card-text
          .section-view(v-if="!edit.info")
            .field(v-for="field in user.profile")
              h3 {{ field.title }}: {{ field.value }}
              br
          .section-edit(v-else)
            v-form
              .field-edit(v-for="field in user.profile")
                v-text-field(:name="field.title" :label="field.title" :value="field.value")
              v-btn(@click="edit.info = false") Cancel
              v-btn(@click="") Save
        v-card-actions(v-if="ownProfile && !edit.info")
          v-spacer
          v-btn(@click="edit.info = true" fab dark small color="primary")
            v-icon edit
      v-card.groups.section(v-if="user.groups.length" color='grey lighten-4')
        v-card-title
          h2 Groups
        v-card-text
          ul
            li(v-for="group in user.groups") {{ group.name }} ( {{ group.role }} )
      v-card.actions.section(v-if="user.activity.length" color='grey lighten-4')
        v-card-title
          h2 Recent Activity
        v-card-text
          .event(v-for="event in user.activity")
            h3 {{ event.title }} - {{ event.type }}
            h4 {{ event.time }}
            p {{ event.details }}
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import ImgUpload from "@/components/ImgUpload.vue";
import ImgEditHover from "@/components/ImgEditHover.vue";

@Component({
  components: { ImgUpload, ImgEditHover },
  data: () => ({
    user: {},
    username: "",
    imageDialogType: "",
    imageDialog: false,
    imgUpload: "",
    edit: {
      info: false,
      bio: false
    }
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
  computed: {
    dateJoined: function() {
      let date = new Date(this.user.joined);
      return this.monthFormat(date) + " " + date.getFullYear();
    },
    ownProfile: function() {
      return !this.$route.params.username;
    }
  },
  methods: {
    openImageDialog: function(type) {
      this.imageDialog = true;
      this.imageDialogType = type;
    },
    monthFormat: function(date) {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      return months[date.getMonth()];
    },
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
    .v-image
      margin-top: -50%
      margin-left: 10%
      border-radius: 50%
      border: 1px solid black
      box-shadow: 0 0 25px 1px white
  .profile-info
    margin: 0 1em 1em 3em
.sections
  display: flex
  justify-content: center
  flex-direction: column
  .section
    padding: 0.5em
    width: 100%
    margin: 0.5em 0
    display: flex
    flex-direction: column
    justify-content: center
    .v-card__text
      height: 100%
      min-height: 20vh
  .bio
    flex: 1 100%
</style>
