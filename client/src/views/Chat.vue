<template lang="pug">
v-container(fluid grid-list-md).chat
  v-layout.layout
    ConversationIndex(:conversations="conversations"
      @select="selectConvo($event)"
      @new="newConversation"
      @delete="deleteConvo($event)")
    v-divider(vertical)
    ConversationView(:contacts="contacts" :conversation="activeConvo"
      @sendMessage="sendMessage($event)"
      @updateTitle="activeConvo.title = $event"
      @updateRecipients="updateRecipients($event)"
      @leave=""
      @delete="deleteConvo($event)")
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import ConversationIndex from "@/components/chat/ConversationIndex.vue";
import ConversationView from "@/components/chat/ConversationView.vue";
// import date-fns utils
const isToday = require('date-fns/is_today');
const isThisWeek = require('date-fns/is_this_week');
const isThisYear = require('date-fns/is_this_year');
const getTime = require('date-fns/get_time');
const format = require('date-fns/format');
// vuex stuff
import { mapGetters } from "vuex";
import {Conversation} from '@/models/conversation';
import {Contact} from '@/models/contact';
import {Message} from '@/models/message';
import {PropUpdate} from '@/models/propUpdate';

@Component({
  components: {ConversationIndex, ConversationView},
  computed: {
    isMulti: function() {
      return this.activeConvo.members.length > 2;
    },
    isRecipients: function() {
      return this.activeConvo.members.length > 1;
    },
    isFirst: function() {
      return this.activeConvo.messages.length === 0;
    },
    isNew: function() {
      return this.conversations[0] && this.conversations[0].members.length <= 1;
    },
    username: function() {
      return this.getUser.username;
    },
    ...mapGetters({
      getUser: 'getUser',
      contact: 'getContact',
      contacts: 'getContacts',
      conversation: 'getConversation',
      conversations: 'getConversations',
      active: 'activeID',
      activeConvo: 'getActiveConversation',
      connected: 'connected'
    })
  },
  created() {
    for (var c of this.conversations) {
      if (c.active) this.$socket.emit('subscribe', c.id);
    }
  },
  methods: {
    sendMessage: function(body) {
      if (this.isFirst) {
        this.$socket.emit('start_conversation', this.activeConvo);
      }
      if (this.isRecipients) {
        let message = { convoID: this.active, author: this.username, body: body, timestamp: new Date() };
        this.$socket.emit('message', this.active, message);
        this.$store.dispatch("send_message", new Message(message));
      }
    },
    newConversation: function() {
      if (!this.isNew) {
        let newConvo = new Conversation({
          id: new Date().getTime(),
          unread: false,
          title: "",
          styles: {
            color: "default",
            density: "medium"
          },
          notifications: {
            state: true
          },
          created: new Date(),
          creator: this.username,
          members: [ {username: this.username, avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"} ],
          messages: []
        });
        this.$store.dispatch("start_conversation", newConvo);
        this.$store.dispatch("select_conversation", newConvo.id);
      }
    },
    selectConvo: function(i) {
      this.$store.dispatch("select_conversation", i);
      this.$store.dispatch("update_conversation", new PropUpdate({id: i, property: "unread", value: false}));
    },
    deleteConvo: function(i) {
      this.$store.dispatch("delete_conversation", i);
    },
    updateRecipients: function(recipients) {
      let self = new Contact({username: this.username, avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"});
      let allRecpients = recipients;
      allRecpients.push(self);
      if (!this.isFirst) this.$socket.emit('set_recipients', allRecpients, this.activeConvo);
      this.$store.dispatch("set_recipients", allRecpients);
    },
  }
})
export default class Chat extends Vue {}
</script>

<style lang="sass" scoped>
.layout
  height: 100%
.container
  height: 100%
.flex
  display: flex
  flex-direction: column
.container.grid-list-md .layout .flex
  padding: 0
</style>
