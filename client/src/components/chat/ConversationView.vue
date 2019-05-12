<template lang="pug">
  v-flex.active-conversation(sm8)
    MessageBar(v-if="conversation" :conversation="conversation" :contacts="contacts"
      @leave="$emit('leave', $event)"
      @delete="$emit('delete', $event)"
      @pane="pane = $event"
      @updateTitle="$emit('updateTitle', $event)"
      @updateRecipients="$emit('updateRecipients', $event)")
    .body
      v-flex.pane(v-if="pane !== ''" pa4)
        template(v-if="pane === 'notifications'")
          h3.pane-title Mute Notifications
          .pane-content.notifications
            v-select.mute(name="mute" label="How long to turn of notifications for" full-width
              v-model="mute"
              :items="['Keep on','1 hour','6 hours','12 hours','24 hours','1 week','Till I turn them back on']"
              prepend-icon="notifications_off")
        template(v-else-if="pane === 'style'")
          h3.pane-title Conversation Styles
          .pane-content.styles
            v-select.color(name="color" label="Color for messages" full-width
              v-model="styles.color"
              :items="['default','red','blue','green','purple','orange','yellow','pink']"
              prepend-icon="color_lens")
            v-select.density(name="density" label="Density of message list" full-width
              v-model="styles.density"
              :items="['spacious', 'medium', 'cozy']"
              prepend-icon="format_line_spacing")
        template(v-else-if="pane === 'info'")
          h3.pane-title Conversation Info
          .pane-content.information
            .info-item
              h4 Conversation ID:
              span {{ conversation.id }}
            .info-item
              h4 Created:
              span {{ conversation.created }}
            .info-item
              h4 Creator:
              span {{ conversation.creator }}
            .info-item
              h4 Members:
              ul
                li(v-for="m in conversation.members") {{ m.username }}
        v-btn(@click="pane = ''" color="primary") Done
      template(v-else-if="conversation")
        MessageList(:conversation="conversation" :contacts="contacts")
        ReplyBar(@send="$emit('sendMessage', $event)" :disabled="!isRecipients || !conversation.active")
      template(v-else)
        .pane
          h2.pane-title No conversations!
          .pane-content.no-conversations
            p you can start one in the menu to the left
            p just click the plus icon
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
        color: "default",
        density: "medium"
      }
    };
  },
  computed: {
    username: function() {
      return this.$store.getters.getUser.username;
    },
    isRecipients: function() {
      return this.conversation.members.length > 1;
    },
  }
})
export default class ConversationView extends Vue {}
</script>
<style lang="sass" scoped>
  .active-conversation
    height: 100%
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
      .pane-title
        padding-top: 1em
      .pane-content
        padding: 1em
        width: 100%
        height: 100%
      .information
        text-align: left
        .info-item
          padding-bottom: 2em
</style>
