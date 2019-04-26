<template lang="pug">
v-container(fluid grid-list-md).profile
  v-layout.layout
    ImgUpload(:type="imageDialogType" v-on:close="imageDialog = false" :toggle="imageDialog" :multi="false")
    v-flex.heading
      v-card(color='grey lighten-4')
        .header-image
          v-hover
            v-flex.mx-auto(slot-scope='{ hover }')
              v-img(src='http://lorempixel.com/800/200/abstract')
                v-expand-transition
                  .d-flex.transition-fast-in-fast-out.black.v-card--reveal.display-3(v-if='hover' style='height: 100%;')
                    .chip-spacer(@click="openImageDialog('header')")
                      v-chip(outline color="white").edit-img-chip
                        v-avatar
                          v-icon.edit-img photo_camera
                        | Edit
        .header-body
          .profile-image
            v-hover
              v-flex.mx-auto(slot-scope='{ hover }')
                v-img(width='200px' src='http://lorempixel.com/200/200/abstract')
                  v-expand-transition
                    .d-flex.transition-fast-in-fast-out.black.v-card--reveal.display-3(v-if='hover' style='height: 100%;')
                      .chip-spacer(@click="openImageDialog('profile')")
                        v-chip(outline color="white").edit-img-chip
                          v-avatar
                            v-icon.edit-img photo_camera
                          | Edit
          .profile-info
            h1 {{ titleCase(username) }}
            h3 Name: {{ user.name }}
            h3 Joined: {{ dateJoined }}
    v-flex.sections
      v-card.bio.section(color='grey lighten-4')
        v-card-title
          h2 Bio
        v-card-text
          p {{ user.bio }}
      v-card.groups.section(v-if="user.groups" color='grey lighten-4')
        v-card-title
          h2 Groups
        v-card-text
          ul
            li(v-for="group in user.groups") {{ group.name }} ( {{ group.role }} )
      v-card.fields.section(color='grey lighten-4')
        v-card-title
          h2 Profile Info
        v-card-text
          p(v-for="field in user.profile") {{ field.title }}: {{ field.value }}
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import ImgUpload from "@/components/ImgUpload.vue";

@Component({
  components: {ImgUpload},
  data: () => ({
    user: {},
    username: "",
    imageDialogType: "",
    imageDialog: false,
    imgUpload: ""
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
    }
  },
  methods: {
    loadImg: function(e) {
      console.log(e.files);
      var file = e.files[0];
      var reader = new FileReader();
      reader.onloadend = function() {
        this.imgUpload = reader.result;
      };
      reader.readAsDataURL(file);
    },
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
.d-flex
  display: flex
  justify-content: center
.chip-spacer
  margin: auto 50%
  width: 200px
.header-body
  display: flex
  justify-content: left
  .profile-image
    .v-image
      border-radius: 50%
      border: 3px solid black
  .profile-info
    margin: 2em
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
