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
      @updateRecipients="updateRecipients($event)")
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

@Component({
  components: {ConversationIndex, ConversationView},
  data: function() {
    return {
      selected: 0
    }
  },
  computed: {
    activeConvo: function() {
      return this.conversations[this.selected];
    },
    isMulti: function() {
      return this.activeConvo.members.length > 2;
    },
    isRecipients: function() {
      return this.activeConvo.members.length > 1;
    },
    isNew: function() {
      return this.conversations[0].members.length <= 1;
    },
    username: function() {
      return this.getUser.username;
    },
    ...mapGetters({
      getUser: 'getUser',
      contacts: 'getContacts',
      conversations: 'getConversations',
      connected: 'connected'
    })
  },
  created() {
    for (var c of this.conversations) {
      this.$socket.emit('subscribe', c.id);
    }
  },
  sockets: {
      connect: function () {
          console.log('socket connected')
      },
      new_conversation: function (id, conversation) {
          this.$socket.emit('subscribe', id);
          this.conversations.unshift(conversation);
          this.selected++;
      },
      message: function (data) {
        let id = data[0];
        let messageConvo = this.conversations.findIndex(c => c.id === id);
        this.conversations[messageConvo].messages.push(data[1]);
        if (this.selected !== messageConvo) this.conversations[messageConvo].unread = true;
        if (messageConvo > 0) {
          let newest = this.conversations.splice(messageConvo, 1);
          this.conversations.unshift(newest[0]);
        }
        this.selected = this.selected < messageConvo ? this.selected + 1 : this.selected;
      }
  },
  methods: {
    sendMessage: function(body) {
      if (this.isRecipients) {
        let message = { author: this.username, body: body, timestamp: new Date() };
        this.activeConvo.messages.push(message);
        this.$socket.emit('message', this.activeConvo.id, message);
        let newest = this.conversations.splice(this.selected, 1);
        this.conversations.unshift(newest[0]);
        this.selected = 0;
      }
    },
    newConversation: function() {
      if (!this.isNew) {
        let newConvo = new Conversation({
          id: 'new',
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
        this.conversations.unshift(newConvo);
      }
      this.selected = 0;
    },
    selectConvo: function(i) {
      this.selected = i;
      this.conversations[i].unread = false;
    },
    deleteConvo: function(i) {
      this.conversations.splice(i,1);
    },
    updateRecipients: function(recipients) {
      if (!this.isRecipients) {
        // get uuid for new convo
        let id = new Date().getTime(); // later replace with id retrieved from server
        this.$store.dispatch("new_conversation", this.activeConvo);
        this.$socket.emit('new_conversation', id, recipients);
      }
      else this.$socket.emit('set_recipients', this.activeConvo.id, recipients);
      this.activeConvo.members = recipients;

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
