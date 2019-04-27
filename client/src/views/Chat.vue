<template lang="pug">
v-container(fluid grid-list-md).chat
  v-layout.layout(wrap)
    v-flex.conversations(sm4)
      v-text-field(name="search" v-model="query" label="Search").search-field
      v-flex.conversation(v-for="c in conversations")
        h4 {{ c.title }}
        p {{ c.lastMessage.body }}
        h6 {{ c.lastMessage.timestamp }}
        v-icon(v-if="c.unread") exclimation
    v-divider(vertical)
    v-flex.active-conversation(sm8)
      .header
        h2 {{ title }}
      v-divider
      .body
        .messages
          v-flex.message(v-for="m in messages")
            h4 {{ m.author }}
            p {{ m.body }}
            i Sent: {{ m.timestamp }}
        v-text-field(name="reply" v-model="reply" label="Reply" flat).reply-field
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Chat",
  data: () => ({
    query: "",
    conversations: [],
    title: "Active Conversation",
    messages: [
      {
        author: "Test2",
        body: "This is a message from another user",
        timestamp: "8 min ago"
      },
      {
        author: "Test",
        body: "This is a message you sent",
        timestamp: "5 min ago"
      },
      {
        author: "Test2",
        body: "Another message from another user",
        timestamp: "3 min ago"
      },
      {
        author: "Test",
        body: "Another from you",
        timestamp: "1 min ago"
      }
    ],
    reply: ""
  }),
  computed: {
    username: function() {
      return this.$store.getters.user.username;
    }
  },
  created() {},
  methods: {}
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
.search-field
  width: 100%
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
      display: flex
      justify-content: space-between
      flex-direction: column
      .message
        border: 1px solid black
        border-radius: 10px
        margin: 10px
        p
          margin: 0
</style>
