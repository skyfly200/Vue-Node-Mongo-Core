<template lang="pug">
v-container(fluid grid-list-md).chat
  v-layout.layout(wrap)
    v-flex.conversations(sm4)
      v-text-field(name="search" v-model="query" label="Search").search-field
      v-list(three-line).conversation-list
        v-list-tile.conversation(v-for="c in conversations")
          v-list-tile-avatar
            v-img(:src="c.avitar")
          v-list-tile-content(:class="{ unread: c.unread }")
            v-list-tile-title
              h4 {{ c.title }}
            v-list-tile-sub-title
              p {{ c.lastMessage.body }}
              i {{ c.lastMessage.timestamp }}
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
        .reply-bar
          v-text-field(name="reply" v-model="reply" label="Reply" flat).reply-field
          v-btn(fab small color="green")
            v-icon send
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
        id: "4574693653",
        unread: false,
        lastMessage: { body: "Another from you", timestamp: "1 min ago" }
      },
      {
        avitar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "Example 2",
        id: "4425767546",
        unread: true,
        lastMessage: { body: "Hey, whats up?", timestamp: "2 hours ago" }
      }
    ],
    title: "Example",
    messages: [
      {
        avitar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        author: "Test2",
        body: "This is a message from another user",
        timestamp: "8 mins ago"
      },
      {
        avitar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        author: "Test",
        body: "This is a message you sent",
        timestamp: "5 mins ago"
      },
      {
        avitar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        author: "Test2",
        body: "Another message from another user",
        timestamp: "3 mins ago"
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
.header
  text-align: center
.conversation-list
  height: 100%
  .conversation
    .unread p
      font-weight: bold
      color: black
    p
      margin: 0
.search-field
  width: 100%
.reply-field
  width: 100%
.reply-bar
  display: flex
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
