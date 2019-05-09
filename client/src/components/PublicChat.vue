<template lang="pug">
  v-flex.public-chat(sm8)
    .body
      MessageList(:conversation="conversation")
      ReplyBar(v-if="isLoggedIn" @send="sendMessage($event)" :disabled="!isRecipients")
      v-toolbar(v-else dense)
        v-spacer
        v-btn(to="/login/home") Login
        span or
        v-btn(to="/register/home") Register
        span to join the chat
        v-spacer
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
import MessageList from "@/components/chat/MessageList.vue";
import ReplyBar from "@/components/chat/ReplyBar.vue";

@Component({
  components: { MessageList, ReplyBar },
  props: [],
  data: function() {
    return {
      conversation: {
        members: [
          {username: "test", avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"},
          {username: "test2", avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"},
          {username: "test3", avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg"},
          {username: "test4", avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg"},
          {username: "test5", avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg"}
        ],
        messages: [
          { author: "test2", body: "Whats this all about?", timestamp: new Date(2018,11,28) },
          { author: "test", body: "Hello world", timestamp: new Date(2019,2,22) },
          { author: "test4", body: "Cute cats incoming", timestamp: new Date(2019,3,20) },
          { author: "test5", body: "That world is flat", timestamp: new Date(2019,4,17) },
          { author: "test3", body: "OMFG", timestamp: new Date(2019,4,20) },
          { author: "test5", body: "LOL JK", timestamp: new Date(2019,5,2) },
          { author: "test", body: "Whats up everyone", timestamp: new Date() }
        ]
      }
    };
  },
  computed: {
    username: function() {
      return this.$store.getters.getUser.username;
    },
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    isRecipients: function() {
      return this.conversation.members.length > 1;
    },
  },
  methods: {
    sendMessage: function(body) {
      let message = { author: this.username, body: body, timestamp: new Date() };
      if (this.isRecipients) {
        this.conversation.messages.push(message);
      }
    }
  }
})
export default class Conversation extends Vue {}
</script>
<style lang="sass" scoped>
  .public-chat
    height: strech
    margin-right: -1px
    .body
      height: 100%
      display: flex
      justify-content: flex-end
      flex-direction: column
</style>
