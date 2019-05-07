<template lang="pug">
  v-toolbar.view-toolbar(flat dense)
    template(v-if="menu === 'recipients' || !isRecipients")
      UserSelector(:previous="conversation.members" :contacts="contacts" @done="updateRecipients($event)")
    template(v-else-if="menu === 'search'")
      v-text-field.search(name="search" label="Search Conversation" single-line full-width hide-details
        v-model="query"
        prepend-icon="search"
        append-icon="clear"
        @click:append="query = ''"
        append-outer-icon="check"
        @click:append-outer="menu = ''")
    template(v-else-if="menu === 'mute'")
      v-select.mute(name="mute" label="Mute Notifications Period" single-line full-width hide-details
        v-model="mute"
        :items="['Keep on','1 hour','6 hours','12 hours','24 hours','1 week','Till I turn them back on']"
        prepend-icon="notifications_off"
        append-outer-icon="check"
        @click:append-outer="menu = ''")
    template(v-else-if="menu === 'title'")
      v-text-field.title-edit(name="title" label="Conversation Title" single-line full-width hide-details
        v-model="title"
        prepend-icon="title"
        append-outer-icon="check"
        @click:append-outer="updateTitle")
    template(v-else-if="menu === 'color'")
      v-select.color(name="color" label="Set Message Color" single-line full-width hide-details return-object
        v-model="color"
        :items="colors"
        item-text="title"
        item-value="hex"
        prepend-icon="color_lens"
        append-outer-icon="check"
        @click:append-outer="menu = ''")
    template(v-else)
      v-spacer
      v-toolbar-title.title-view {{ autoTitle(conversation) }}
      v-spacer
      v-menu(bottom left)
        template(v-slot:activator="{ on }")
          v-btn(icon v-on="on")
            v-icon more_vert
        v-list
          v-list-tile(@click="menu = 'search'")
            v-list-tile-action
              v-icon search
            v-list-tile-title Search Conversation
          v-list-tile(@click="menu = 'mute'")
            v-list-tile-action
              v-icon notifications_off
            v-list-tile-title Mute Notifications
          v-list-tile(v-if="isMulti" @click="menu = 'title'")
            v-list-tile-action
              v-icon title
            v-list-tile-title Rename Conversation
          v-list-tile(v-if="isMulti && isOwner" @click="menu = 'recipients'")
            v-list-tile-action
              v-icon person_add
            v-list-tile-title Edit Recipients
          v-list-tile(v-if="isMulti" @click="")
            v-list-tile-action
              v-icon remove_circle
            v-list-tile-title Leave Conversation
          v-list-tile(@click="menu = 'color'")
            v-list-tile-action
              v-icon color_lens
            v-list-tile-title Set Message Color
          v-list-tile(@click="menu = 'info'")
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
      query: "",
      mute: "",
      color: 0,
      colors: [
        {title: "Red", hex: "#FF0000"},
        {title: "Green", hex: "#00FF00"},
        {title: "Blue", hex: "#0000FF"}
      ]
    };
  },
  created: function() {
    this.title = this.conversation.title;
  },
  computed: {
    username: function() {
      return this.$store.getters.user.username;
    },
    isMulti: function() {
      return this.conversation.members.length > 2;
    },
    isOwner: function() {
      return this.conversation.creator === this.$store.getters.user.username;
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
    getOtherMembers: function(members) {
      return members.filter( (m) => (m.username !== this.username));
    },
    autoTitle: function(c) {
      let auto = this.getOtherMembers(c.members).map(m => (this.titleCase(m.username))).join(', ');
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
