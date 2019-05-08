<template lang="pug">
  v-flex.active-conversation(sm8)
    MessageBar(:conversation="conversation" :contacts="contacts"
      @leave=""
      @delete=""
      @pane="pane = $event"
      @updateTitle="$emit('updateTitle', $event)"
      @updateRecipients="$emit('updateRecipients', $event)")
    .body
      v-flex.pane(v-if="pane !== ''" pa4)
        template(v-if="pane === 'notifications'")
          h3.pane-title Mute Notifications
          .pane-content
            v-select.mute(name="mute" label="How long to turn of notifications for" single-line full-width hide-details
              v-model="mute"
              :items="['Keep on','1 hour','6 hours','12 hours','24 hours','1 week','Till I turn them back on']"
              prepend-icon="notifications_off")
        template(v-else-if="pane === 'style'")
          h3.pane-title Conversation Styles
        template(v-else-if="pane === 'info'")
          h3.pane-title Conversation Info
        v-btn(@click="pane = ''" color="primary") Done
      template(v-else)
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
    return {
      pane: "",
      mute: "",
      styles: {
        color: ""
      }
    };
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
    .pane
      text-align: center
      height: 100%
      display: flex
      flex-direction: column
      justify-content: space-between
    .pane-content
      width: 100%
      height: 100%
</style>
