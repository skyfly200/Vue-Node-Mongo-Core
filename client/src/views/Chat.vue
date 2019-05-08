<template lang="pug">
v-container(fluid grid-list-md).chat
  v-layout.layout
    ConversationIndex(:conversations="conversations"
      @select="selectConvo($event)"
      @new="newConversation"
      @delete="deleteConvo($event)")
    v-divider(vertical)
    Conversation(:contacts="contacts" :conversation="activeConvo"
      @sendMessage="sendMessage($event)"
      @updateTitle="activeConvo.title = $event"
      @updateRecipients="updateRecipients($event)")
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import ConversationIndex from "@/components/chat/ConversationIndex.vue";
import Conversation from "@/components/chat/Conversation.vue";
// import date-fns utils
const isToday = require('date-fns/is_today');
const isThisWeek = require('date-fns/is_this_week');
const isThisYear = require('date-fns/is_this_year');
const getTime = require('date-fns/get_time');
const format = require('date-fns/format');

@Component({
  name: "Chat",
  components: {ConversationIndex, Conversation},
  data: function() {
    return {
      selected: 0,
      contacts: [
        {username: "test", avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"},
        {username: "test2", avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"},
        {username: "test3", avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg"},
        {username: "test4", avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg"},
        {username: "skyfly", avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg"},
      ],
      conversations: [
        {
          id: new Date(2018,11,28).getTime(),
          unread: false,
          title: "",
          creator: "test",
          members: [
            {username: "skyfly", avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg"},
            {username: "test", avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"},
            {username: "test2", avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"}
          ],
          messages: [
            { author: "test2", body: "This is a message from another user", timestamp: new Date(2018,11,28) },
            { author: "test", body: "This is a message you sent", timestamp: new Date(2019,2,22) },
            { author: "test2", body: "Another message from another user", timestamp: new Date(2019,3,20) },
            { author: "test", body: "Another from you", timestamp: new Date() }
          ]
        },
        {
          id: new Date(2019,4,3).getTime(),
          unread: true,
          title: "",
          creator: "test",
          members: [
            {username: "skyfly", avatar: "https://cdn.vuetifyjs.com/images/lists/6.jpg"},
            {username: "test", avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"}
          ],
          messages: [
            { author: "test", body: "Hey, whats up?", timestamp: new Date(2019,4,3) }
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
    },
  },
  created() {},
  sockets: {
      connect: function () {
          console.log('socket connected')
      },
      message: function (message) {
        this.activeConvo.messages.push(message);
      }
  },
  methods: {
    sendMessage: function(body) {
      let message = { author: this.username, body: body, timestamp: new Date() };
      if (this.isRecipients) {
        this.activeConvo.messages.push(message);
        this.$socket.emit('message', message)
      }
    },
    newConversation: function() {
      if (!this.isNew) {
        let conversation = {
          id: new Date().getTime(),
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
    selectConvo: function(i) {
      this.selected = i;
      this.conversations[i].unread = false;
    },
    deleteConvo: function(i) {
      this.conversations.splice(i,1);
      this.editRecipients = false;
      this.editTitle = false;
    },
    updateRecipients: function(recipients) {
      this.activeConvo.members = recipients;
    },
  }
})
export default class Profile extends Vue {}
</script>

<style lang="sass" scoped>
.layout
  height: 100%
.container
  height: 100%
.flex
  display: flex
  flex-direction: column
</style>
