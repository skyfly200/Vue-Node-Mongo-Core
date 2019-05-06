<template lang="pug">
  v-toolbar.view-toolbar(flat dense)
    template(v-if="editRecipients || !isRecipients")
      UserSelector(:previous="conversation.members" :contacts="contacts" @done="updateRecipients($event)")
    template(v-else-if="editTitle")
      v-text-field.title-edit(name="title" label="Conversation Title" single-line full-width hide-details
        v-model="title"
        append-icon="check"
        @click:append="updateTitle")
    template(v-else)
      v-spacer
      v-toolbar-title.title-view {{ autoTitle(conversation) }}
      v-spacer
      v-btn(v-if="isMulti" small icon @click="editTitle = true")
        v-icon(small) edit
      v-btn(v-if="isMulti" small icon @click="editRecipients = true")
        v-icon(small) person_add
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
import UserSelector from "@/components/chat/UserSelector.vue";

@Component({
  components: { UserSelector },
  props: ["conversation", "contacts"],
  data: function() {
    return {
      title: "",
      editTitle: false,
      editRecipients: false
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
    isRecipients: function() {
      return this.conversation.members.length > 1;
    },
  },
  methods: {
    updateTitle: function() {
      this.editTitle = false;
      this.$emit('updateTitle', this.title);
      this.title = "";
    },
    updateRecipients: function(recipients) {
      this.editRecipients = false;
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
