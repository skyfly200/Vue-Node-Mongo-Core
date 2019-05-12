<template lang="pug">
  v-toolbar.view-toolbar(flat dense)
    template(v-if="menu === 'recipients' || !isRecipients")
      UserSelector(:previous="getOthers(conversation.members)" :contacts="getOthers(contacts)" @done="updateRecipients($event)")
    template(v-else-if="menu === 'search'")
      v-text-field.search(name="search" label="Search Conversation" single-line full-width hide-details clearable
        v-model="query"
        prepend-icon="search"
        append-outer-icon="check"
        @click:append-outer="menu = ''")
    template(v-else-if="menu === 'title'")
      v-text-field.title-edit(name="title" label="Conversation Title" single-line full-width hide-details
        v-model="title"
        prepend-icon="title"
        append-outer-icon="check"
        @click:append-outer="updateTitle")
    template(v-else)
      v-spacer
      v-toolbar-title.title-view {{ autoTitle(conversation) }}
      v-spacer
      v-menu(bottom left)
        template(v-slot:activator="{ on }")
          v-btn(icon v-on="on")
            v-icon more_vert
        v-list(dense)
          v-list-tile(@click="menu = 'search'")
            v-list-tile-action
              v-icon search
            v-list-tile-title Search Conversation
          v-list-tile(v-if="isMulti" @click="menu = 'title'")
            v-list-tile-action
              v-icon title
            v-list-tile-title Rename Conversation
          v-list-tile(v-if="isMulti && isOwner" @click="menu = 'recipients'")
            v-list-tile-action
              v-icon person_add
            v-list-tile-title Edit Recipients
          v-list-tile(v-if="isMulti" @click="$emit('leave', conversation.id)")
            v-list-tile-action
              v-icon remove_circle
            v-list-tile-title Leave Conversation
          v-list-tile(@click="$emit('delete', conversation.id)")
            v-list-tile-action
              v-icon delete
            v-list-tile-title Delete Conversation
          v-list-tile(@click="$emit('pane', 'notifications')")
            v-list-tile-action
              v-icon notifications_off
            v-list-tile-title Mute Notifications
          v-list-tile(@click="$emit('pane', 'style')")
            v-list-tile-action
              v-icon color_lens
            v-list-tile-title Set Conversation Styles
          v-list-tile(@click="$emit('pane', 'info')")
            v-list-tile-action
              v-icon info
            v-list-tile-title Info
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
import UserSelector from "@/components/chat/UserSelector.vue";

@Component({
  components: { UserSelector },
  props: ["conversation", "contacts"],
  data: function() {
    return {
      menu: "",
      title: "",
      query: ""
    };
  },
  created: function() {
    this.title = this.conversation.title;
  },
  computed: {
    username: function() {
      return this.$store.getters.getUser.username;
    },
    isMulti: function() {
      return this.conversation.members.length > 2;
    },
    isOwner: function() {
      return this.conversation.creator === this.$store.getters.getUser.username;
    },
    isRecipients: function() {
      return this.conversation.members.length > 1;
    },
  },
  methods: {
    updateTitle: function() {
      this.menu = "";
      this.$emit('updateTitle', this.title);
      this.title = "";
    },
    updateRecipients: function(recipients) {
      this.menu = "";
      this.$emit('updateRecipients', recipients);
    },
    getOthers: function(members) {
      return members ? members.filter( (m) => (m.username !== this.username)) : [];
    },
    autoTitle: function(c) {
      let auto = this.getOthers(c.members).map(m => (this.titleCase(m.username))).join(', ');
      return c.title ? c.title : (c.members.length > 1 ? (c.messages.length > 0 ? auto : "New Message to " + auto) : "New Message");
    },
    titleCase: function(string) {
      return (string ? string.charAt(0).toUpperCase() + string.slice(1) : "");
    }
  }
})
export default class MessageBar extends Vue {}
</script>
<style lang="sass" scoped></style>
