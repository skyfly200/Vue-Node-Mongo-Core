<template lang="pug">
v-container(fluid grid-list-md).chat
  v-layout.layout(wrap)
    v-flex.conversations(sm4)
      v-text-field(name="search" v-model="query" label="Search").search-field
      v-list(three-line).conversation-list
        v-list-tile.conversation(v-for="c in conversations")
          v-list-tile-avatar
            v-img(:src="c.avitar")
          v-list-tile-content
            v-list-tile-title
              h4 {{ c.title }}
            v-list-tile-sub-title
              p {{ c.lastMessage.body }}
              p {{ c.lastMessage.timestamp }}
              v-icon(v-if="c.unread") exclimation
    v-divider(vertical)
    v-flex.active-conversation(sm8)
      .header
        h2 {{ title }}
      v-divider
      .body
        .messages
          v-list(three-line)
            v-list-tile.message(v-for="m in messages")
              v-list-tile-avatar
                v-img(:src="m.avitar")
              v-list-tile-content
                v-list-tile-title
                  h2 {{ m.author }}
                v-list-tile-sub-title
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
    conversations: [
      {
        avitar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: "Example",
        id: "",
        lastMessage: { body: "Sample conversation", timestamp: "1 in ago" }
      }
    ],
    title: "Active Conversation",
    messages: [
      {
        avitar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        author: "Test2",
        body: "This is a message from another user",
        timestamp: "8 min ago"
      },
      {
        avitar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        author: "Test",
        body: "This is a message you sent",
        timestamp: "5 min ago"
      },
      {
        avitar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        author: "Test2",
        body: "Another message from another user",
        timestamp: "3 min ago"
      },
      {
        avitar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
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
.conversation-list
  height: 100%
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