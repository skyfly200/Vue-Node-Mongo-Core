<template lang="pug">
v-container(fluid grid-list-md).chat
  v-layout.layout(wrap)
    v-flex.conversations(sm4)
      v-text-field(name="search" v-model="query" label="Search").search-field
      v-list(three-line).conversation-list
        template(v-for="(c, i) in conversations")
          v-divider(v-if="i > 0")
          v-list-tile.conversation
            v-list-tile-avatar
              v-img(:src="c.avitar")
            v-list-tile-content(:class="{ unread: c.unread }")
              v-list-tile-title
                h5 {{ c.title }}
              v-list-tile-sub-title
                .message-body {{ c.lastMessage.body }}
                .timestamp {{ c.lastMessage.timestamp }}
    v-divider(vertical)
    v-flex.active-conversation(sm8)
      .header
        h2 {{ title }}
      v-divider
      .body
        .messages
          v-list
            v-list-tile.message(v-for="m in messages")
              v-list-tile-avatar(v-if="m.author !== nickname")
                v-img(:src="m.avitar")
              v-list-tile-content
                v-list-tile-sub-title
                  .message-body {{ m.body }}
                  .timestamp Sent: {{ m.timestamp }}
              v-list-tile-avatar(v-if="m.author === nickname")
                v-img(:src="m.avitar")
        .reply-bar
          v-text-field(name="reply" v-model="reply" label="Reply" solo).reply-field
          v-btn(fab small color="green")
            v-icon send
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Chat",
  data: () => ({
    nickname: "Test",
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
.v-input__slot
  margin: 0
  padding: 0
.v-list__tile__content
  height: auto
.search-field
  width: 100%
.reply-field
  width: 100%
.reply-bar
  display: flex
  margin-bottom: -30px
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
