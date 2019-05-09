<template lang="pug">
v-container(fluid grid-list-md).group
  ImgUpload(:type="imageDialogType" @done="console.log($event)" @close="imageDialog = false" :toggle="imageDialog" :multi="false")
  v-layout.layout
    v-flex.heading
      v-card(color='grey lighten-4')
        .header-image
          ImgEditHover(:editable="isGroupAdmin" v-on:open="openImageDialog('header')" src='http://lorempixel.com/800/200/abstract')
        .header-body
          .group-image
            ImgEditHover(profile="true" :editable="isGroupAdmin" v-on:open="openImageDialog('profile')" width='200px' src='http://lorempixel.com/200/200/abstract')
          .group-info
            h1 {{ titleCase(title) }}
            h3 Created: {{ dateCreated }}
            .link-icons
              v-btn(v-if="group.website" flat icon href="group.website" target="blank")
                v-icon public
              v-btn(v-if="group.stream" flat icon :href="group.stream" target="blank")
                v-icon headset
              v-btn(v-if="group.social.facebook" flat icon :href="'https://www.facebook.com/' + group.social.facebook" target="blank")
                v-icon share
        v-card-actions
          v-spacer
          .group-actions
            v-btn(@click="" color="primary")
              v-icon(left) person_add
              | Join
            v-btn(@click="" color="primary")
              v-icon(left) notifications
              | Follow
    v-flex.sections
      v-card.bio.section(color='grey lighten-4')
        v-card-title
          h2 Bio
        v-card-text
          .section-view(v-if="!edit.bio")
            p {{ group.bio }}
          .section-edit(v-else)
            v-form
              v-textarea(name="bio" label="Bio" :value="group.bio")
              v-btn(@click="edit.bio = false") Cancel
              v-btn(@click="") Save
        v-card-actions(v-if="isGroupAdmin && !edit.bio")
          v-spacer
          v-btn(@click="edit.bio = true" fab dark small color="primary")
            v-icon edit
      v-card.fields.section(color='grey lighten-4')
        v-card-title
          h2 Group Info
        v-card-text
          .section-view(v-if="!edit.info")
            .field(v-for="field in group.info")
              h3 {{ titleCase(field.title) }}:  {{ field.value }}
              br
          .section-edit(v-else)
            v-form
              .field-edit(v-for="field in group.info")
                v-text-field(:name="field.title" :label="field.title" :value="field.value")
              v-btn(@click="edit.info = false") Cancel
              v-btn(@click="") Save
        v-card-actions(v-if="isGroupAdmin && !edit.info")
          v-spacer
          v-btn(@click="edit.info = true" fab dark small color="primary")
            v-icon edit
      v-card.members.section(color='grey lighten-4')
        v-card-title
          h2 Members
        v-card-text
          .member-list
            router-link(v-for="member in group.members" :to="'/profile/' + member.username")
              .member
                v-img.profile-img(:src="member.img" width="4em")
                h4 {{ member.name }}&nbsp;
                  v-icon(v-if="member.role === 'admin'" small color="purple") star
                span Since {{ dateFormat(member.joined) }}
      v-card.activity.section(v-if="group.activity !== undefined && group.activity.length" color='grey lighten-4')
        v-card-title
          h2 Recent Activity
        v-card-text
          .event(v-for="event in group.activity")
            h3 {{ event.title }} - {{ event.type }}
            h4 {{ event.time }}
            p {{ event.details }}
      v-card.activity.section(color='grey lighten-4')
        v-card-title
          h2 Images
        v-card-text
          .gallery
            v-img.image(:src="img.src" v-for="img in group.images")
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import ImgUpload from "@/components/ImgUpload.vue";
import ImgEditHover from "@/components/ImgEditHover.vue";

@Component({
  components: { ImgUpload, ImgEditHover },
  data: () => ({
    group: {
      bio: "This is a test group",
      website: "example.com",
      created: new Date(),
      social: {
        facebook: "skyfly"
      },
      info: [
        {title: "location", value: "Boulder, CO"},
        {title: "type", value: "Meetup"},
        {title: "topic", value: "Web Dev"}
      ],
      members: [
        { name: "Supreme Leader", username: "test", role: "admin", joined: new Date(), img: "http://lorempixel.com/200/200/animals/0"},
        { name: "Skyler", username: "skyfly", role: "user", joined: new Date(), img: "http://lorempixel.com/200/200/animals/1"}
      ],
      images: [
        {src: "http://lorempixel.com/200/200/nature/0"},
        {src: "http://lorempixel.com/200/200/nature/1"},
        {src: "http://lorempixel.com/200/200/nature/2"}
      ],
      activity: []
    },
    title: "",
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
      this.title = this.$route.params.title;
      this.getGroup(this.title);
    }
  },
  created() {
    this.title = this.$route.params.title;
    this.getGroup(this.title);
  },
  computed: {
    dateCreated: function() {
      return this.dateFormat(this.group.created);
    },
    isGroupAdmin: function() {
      // check if current user is a group admin
      let groups = this.$store.getters.getUser.groups;
      return groups && groups[this.title].role === "admin";
    }
  },
  methods: {
    openImageDialog: function(type) {
      this.imageDialog = true;
      this.imageDialogType = type;
    },
    dateFormat: function(d) {
      let date = new Date(d);
      return this.monthFormat(date) + " " + date.getFullYear();
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
    getGroup: function(title) {
      this.$http({
        url: "http://localhost:1234/groups/" + title,
        method: "GET"
      })
        .then(resp => {
          if (resp.data.err) {
            console.error(resp.data.err);
          } else {
            this.group = resp.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
})
export default class Group extends Vue {}
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
  flex-wrap: wrap
  justify-content: left
  .group-image
    margin-left: 10%
  .group-info
    margin: 0 1em 1em 3em
  .group-actions
    margin: auto
    margin-right: 2em
.sections
  display: flex
  justify-content: center
  flex-wrap: wrap
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
    flex: 1 50%
  .fields
    flex: 1 50%
    .section-view
      margin-left: 4em
  .member-list
    display: flex
    a
      text-decoration: none
    .member
      padding: 0.5em
      margin: 0.5em
      height: 8em
      text-align: center
      h4 i
        margin-bottom: 0.1em
      h4, span
        color: black
      .profile-img
        margin: auto
        border-radius: 50%
        border: 2px solid black
.gallery
  display: flex
  .image
    width: auto
    margin: auto
    max-width: 200px
</style>
