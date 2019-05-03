<template lang="pug">
v-container(fluid grid-list-md).chat
  v-layout.layout(wrap)
    v-flex.conversations(sm4)
      v-toolbar.convo-toolbar(flat dense)
        v-text-field.search-field(flat full-width hide-details single-line name="search" v-model="query" label="Search"
          prepend-inner-icon="search"
          append-icon="filter_list"
          append-outer-icon="add_circle"
          @click:append=""
          @click:append-outer="newConversation")
      v-list(three-line).conversation-list
        template(v-for="(c, i) in conversations")
          v-divider(v-if="i > 0")
          v-list-tile.conversation(@click="selectConvo(i)" :key="c.id")
            v-list-tile-avatar
              v-img(v-if="c.members.length > 1" :src="selectConvoAvatar(c)")
              v-icon(v-else large) person
            v-list-tile-content(:class="{ unread: c.unread }")
              v-list-tile-title
                h5 {{ autoTitle(c) }}
              v-list-tile-sub-title
                template(v-if="c.messages.length")
                  .message-body {{ c.messages[c.messages.length - 1].body }}
                  .timestamp {{ c.messages[c.messages.length - 1].timestamp }}
            v-btn(v-if="c.members.length < 2" icon flat @click="deleteConvo(i)")
              v-icon close
    v-divider(vertical)
    v-flex.active-conversation(sm8)
      v-toolbar.view-toolbar(flat dense)
        template(v-if="editRecipients || !isRecipients")
          v-autocomplete.recipients(label="To" chips full-width return-object hide-details hide-no-data hide-selected multiple single-line dense
            v-model="conversations[selected].members"
            :items="contacts"
            item-text="username"
            item-value="username"
            append-outer-icon="check"
            @select=""
            @click:append-outer="editRecipients = false")
            template(v-slot:selection='data')
              v-chip.chip--select-multi(:selected='data.selected' close @input='removeRecipient(data.item)')
                v-avatar
                  img(:src='data.item.avatar')
                | {{ data.item.username }}
            template(v-slot:item='data')
              template(v-if="typeof data.item !== 'object'")
                v-list-tile-content(v-text='data.item')
              template(v-else)
                v-list-tile-avatar
                  img(:src='data.item.avatar')
                v-list-tile-content
                  v-list-tile-title {{ data.item.username }}
        template(v-else-if="editTitle")
          v-text-field.title-edit(name="title" label="Conversation Title" single-line full-width hide-details
            v-model="conversations[selected].title"
            append-icon="check"
            @click:append="editTitle = false")
        template(v-else)
          v-spacer
          v-toolbar-title.title-view {{ autoTitle(conversations[selected]) }}
          v-spacer
          v-btn(v-if="isMulti" small icon @click="editTitle = true")
            v-icon(small) edit
          v-btn(v-if="isMulti" small icon @click="editRecipients = true")
            v-icon(small) person_add
      .body
        .messages
          v-list
            v-list-tile.message(v-for="m in conversations[selected].messages" :key="m.timestamp")
              v-list-tile-avatar(v-if="m.author !== username")
                v-img(:src="getAvatar(m.author)")
              v-list-tile-content
                v-list-tile-sub-title
                  .author(v-if="isMulti && m.author !== username") {{ m.author }}
                  .message-body {{ m.body }}
                  .timestamp Sent: {{ m.timestamp }}
              v-list-tile-avatar(v-if="m.author === username")
                v-img(:src="getAvatar(m.author)")
        v-form.reply-bar(@submit.prevent="sendMessage")
          v-text-field(name="reply" v-model="reply" label="Reply" :disabled="!isRecipients" autofocus single-line full-width hide-details).reply-field
          v-btn(fab small color="green" @click="sendMessage").send
            v-icon send
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Chat",
  data: function() {
    return {
      query: "",
      reply: "",
      selected: 0,
      recipients: "",
      editRecipients: false,
      editTitle: false,
      contacts: [
        {username: "test2", avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"},
        {username: "test3", avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg"},
        {username: "test4", avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg"},
        {username: "test5", avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg"},
      ],
      conversations: [
        {
          id: 4345735646,
          unread: false,
          title: "",
          creator: this.$store.getters.user.username,
          members: [
            {username: this.$store.getters.user.username, avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"},
            {username: "test2", avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"}
          ],
          messages: [
            { author: "test2", body: "This is a message from another user", timestamp: "8 mins ago" },
            { author: "test", body: "This is a message you sent", timestamp: "5 mins ago" },
            { author: "test2", body: "Another message from another user", timestamp: "3 mins ago" },
            { author: "test", body: "Another from you", timestamp: "1 min ago" }
          ]
        },
        {
          id: 4425735646,
          unread: true,
          title: "",
          creator: "test3",
          members: [
            {username: this.$store.getters.user.username, avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"},
            {username: "test3", avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg"}
          ],
          messages: [
            { author: "test3", body: "Hey, whats up?", timestamp: "2 hours ago" }
          ]
        }
      ]
    }
  },
  computed: {
    activeConvo: function() {
      return this.conversations[this.selected];
    },
    username: function() {
      return this.$store.getters.user.username;
    },
    isMulti: function() {
      return this.activeConvo.members.length > 2;
    },
    isRecipients: function() {
      return this.activeConvo.members.length > 1;
    },
    isNew: function() {
      return this.conversations[0].members.length === 1;
    }
  },
  created() {},
  methods: {
    sendMessage: function() {
      let message = { author: this.username, body: this.reply, timestamp: new Date() };
      if (this.reply && this.isRecipients) {
        this.reply = "";
        this.activeConvo.messages.push(message);
      }
    },
    newConversation: function() {
      if (!this.isNew) {
        let conversation = {
          id: 4425735346,
          unread: false,
          title: "",
          creator: this.username,
          members: [ {username: this.username, avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"} ],
          messages: []
        };
        this.conversations.unshift(conversation);
      }
      this.selected = 0;
      this.editRecipients = true;
    },
    autoTitle: function(c) {
      let auto = this.getOtherMembers(c.members).map(m => (this.titleCase(m.username))).join(', ');
      return c.title ? c.title : (c.members.length > 1 ? auto : "New Message");
    },
    selectConvo: function(i) {
      this.selected = i;
      this.editRecipients = this.activeConvo.members.length <= 1;
      this.editTitle = false;
    },
    deleteConvo: function(i) {
      this.conversations.splice(i,1);
    },
    removeRecipient: function(user) {
      const index = this.activeConvo.members.findIndex( (m) => (m.username === user.username) );
      if (index >= 0) this.activeConvo.members.splice(index, 1);
    },
    getAvatar: function(author) {
      return this.activeConvo.members.find( (m) => (m.username === author) ).avitar;
    },
    getOtherMembers: function(members) {
      return members.filter( (m) => (m.username !== this.username));
    },
    selectConvoAvatar: function(c) {
      let members = this.getOtherMembers(c.members);
      return members.length && members[0] ? members[0].avatar : null;
    },
    titleCase: function(string) {
      return (string ? string.charAt(0).toUpperCase() + string.slice(1) : "");
    }
  }
})
export default class Profile extends Vue {}
</script>

<style lang="sass" scoped>
.layout
  display: flex
  height: 100%
.container
  height: 100%
.app
  height: 100vh
.flex
  display: flex
  justify-content: center
  flex-direction: column
.conversation-list
  height: 100%
  .conversation
    .v-list__tile__content
      margin-top: -15px
    .unread .message-body
      font-weight: bold
      color: black
    .message-body
      margin: 0
    .timestamp
      font-size: 0.8em
.v-input__slot
  margin: 0
  padding: 0
.v-list__tile__content
  height: auto
.reply-bar
  display: flex
  margin-bottom: -30px
  button i
    transform: rotate(-90deg)
.active-conversation
  height: 100%
  margin-left: -1px
  .body
    height: 100%
    display: flex
    justify-content: flex-end
    flex-direction: column
    .messages
      height: 100%
      .v-list
        padding: 0
        height: 100%
        display: flex
        flex-direction: column
        justify-content: flex-end
        .v-list__tile__content
          padding: 7px
          background-color: #eee
          border-radius: 10px
          .message-body
            color: black
          .timestamp
            font-size: 0.8em
      .message
        margin: 10px
        p
          margin: 0
</style>
