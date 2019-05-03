<template lang="pug">
v-container(fluid grid-list-md).chat
  v-layout.layout(wrap)
    v-flex.conversations(sm4)
      v-toolbar.convo-toolbar(flat compact)
        v-toolbar-items.tools
          v-text-field(name="search" solo v-model="query" label="Search").search-field
          .buttons
            v-btn.show-filters(icon @click="")
              v-icon filter_list
            v-btn.new-conversation(icon @click="newConversation")
              v-icon add
      v-list(three-line).conversation-list
        template(v-for="(c, i) in conversations")
          v-divider(v-if="i > 0")
          v-list-tile.conversation(@click="selectConvo(i)")
            v-list-tile-avatar
              v-img(:src="selectConvoAvatar(c)")
            v-list-tile-content(:class="{ unread: c.unread }")
              v-list-tile-title
                h5 {{ c.title }}
              v-list-tile-sub-title
                .message-body {{ c.messages[getLast(c)].body }}
                .timestamp {{ c.messages[getLast(c)].timestamp }}
    v-divider(vertical)
    v-flex.active-conversation(sm8)
      v-toolbar.header(flat compact)
        h2 {{ conversations[selected].title }}
      .body
        .messages
          v-list
            v-list-tile.message(v-for="m in conversations[selected].messages")
              v-list-tile-avatar(v-if="m.author !== username")
                v-img(:src="getAvitar(m.author)")
              v-list-tile-content
                v-list-tile-sub-title
                  .author(v-if="isMulti && m.author !== username") {{ m.author }}
                  .message-body {{ m.body }}
                  .timestamp Sent: {{ m.timestamp }}
              v-list-tile-avatar(v-if="m.author === username")
                v-img(:src="getAvitar(m.author)")
        v-form.reply-bar(@submit.prevent="sendMessage")
          v-text-field(name="reply" v-model="reply" label="Reply" solo).reply-field
          v-btn(fab small color="green" @click="sendMessage").send
            v-icon send
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Chat",
  data: function() {
    return {
      nickname: "test",
      query: "",
      reply: "",
      selected: 0,
      conversations: [
        {
          id: "4345735646",
          unread: false,
          title: "Example",
          creator: this.$store.getters.user.username,
          members: [
            {username: this.$store.getters.user.username, avitar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"},
            {username: "test2", avitar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"}
          ],
          messages: [
            { author: "test2", body: "This is a message from another user", timestamp: "8 mins ago" },
            { author: "test", body: "This is a message you sent", timestamp: "5 mins ago" },
            { author: "test2", body: "Another message from another user", timestamp: "3 mins ago" },
            { author: "test", body: "Another from you", timestamp: "1 min ago" }
          ]
        },
        {
          id: "4425735646",
          unread: true,
          title: "Example 2",
          creator: this.$store.getters.user.username,
          members: [
            {username: this.$store.getters.user.username, avitar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"},
            {username: "test3", avitar: "https://cdn.vuetifyjs.com/images/lists/3.jpg"}
          ],
          messages: [
            { author: "test3", body: "Hey, whats up?", timestamp: "2 hours ago" }
          ]
        }
      ]
    }
  },
  computed: {
    username: function() {
      return this.$store.getters.user.username;
    },
    isMulti: function() {
      return this.conversations[this.selected].members.length > 2;
    }
  },
  created() {},
  methods: {
    sendMessage: function() {
      let body = this.reply;
      if (body) {
        let message = {
          author: this.username,
          body: body,
          timestamp: new Date()
        };
        this.reply = ""
        this.conversations[this.selected].messages.push(message);
      }
    },
    newConversation: function() {
      let conversation = {
        title: "New Conversation",
        creator: this.username,
        members: [
          {username: this.username, avitar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"}
        ],
        id: "4425735646",
        unread: false,
        messages: []
      };
      this.conversations.push(conversation);
    },
    selectConvo: function(i) {
      this.selected = i;
    },
    getLast: function(c) {
      return c.messages.length - 1;
    },
    getAvitar: function(author) {
      let member = this.conversations[this.selected].members.find( (m) => (m.username === author) );
      return member.avitar;
    },
    selectConvoAvatar: function(c) {
      //let display = c.messages.length - 1;
      let username = c.messages[0].author;
      let avitar = c.members.find( (m) => (m.username === username) ).avitar;
      return avitar;
    },
    titleCase: function(string) {
      if (string) return string.charAt(0).toUpperCase() + string.slice(1);
      else return "";
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
.header
  text-align: center
.conversation-list
  height: 100%
  .conversation
    margin-top: 5px
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
.tools
  width: 100%
  margin: auto
.search-field
  width: 100%
  margin: auto
  padding-top: 8px
.buttons
  display: flex
  flex-direction: row
.reply-bar
  display: flex
  margin-bottom: -30px
  button i
    transform: rotate(-90deg)
.reply-field
  width: 100%
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
