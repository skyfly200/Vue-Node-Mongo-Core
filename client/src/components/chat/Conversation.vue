<template lang="pug">
  v-flex.active-conversation(sm8)
    MessageBar(:conversation="conversation" :contacts="contacts"
      @updateTitle="$emit('updateTitle', $event)"
      @updateRecipients="$emit('updateRecipients', $event)")
    .body
      MessageList(:conversation="conversation")
      ReplyBar(@send="$emit('sendMessage', $event)" :disabled="!isRecipients")
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
import MessageBar from "@/components/chat/MessageBar.vue";
import MessageList from "@/components/chat/MessageList.vue";
import ReplyBar from "@/components/chat/ReplyBar.vue";

@Component({
  components: { MessageBar, MessageList, ReplyBar },
  props: ["contacts", "conversation"],
  data: function() {
    return {};
  },
  computed: {
    username: function() {
      return this.$store.getters.user.username;
    },
    isRecipients: function() {
      return this.conversation.members.length > 1;
    },
  }
})
export default class Conversation extends Vue {}
</script>
<style lang="sass" scoped>
  .active-conversation
    height: 100%
    margin-right: -1px
    .body
      height: 100%
      display: flex
      justify-content: flex-end
      flex-direction: column
</style>
