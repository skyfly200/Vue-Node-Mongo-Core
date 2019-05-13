<template lang="pug">
  .reply
    Picker(v-show="showEmojiPicker" title="Pick your emoji..." emoji="point_up" set="messenger" @select="addEmoji")
    v-form.reply-bar(@submit.prevent="send")
      v-textarea(autofocus auto-grow no-resize single-line full-width hide-details solo
        name="reply" ref="textarea" rows=1
        append-outer-icon="insert_emoticon"
        @click:append-outer.prevent="toggleShowEmojiPicker"
        v-model="reply" label="Reply" :disabled="disabled")
      v-btn(fab small color="green" :disabled="disabled" @click="send")
        v-icon send
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
import { Picker } from 'emoji-mart-vue';

@Component({
  components: {Picker},
  props: ["disabled"],
  data: () => ({
    reply: "",
    showEmojiPicker: false
  }),
  methods: {
    addEmoji: function(emoji) {
      const textarea = this.$refs.textarea
      const cursorPosition = textarea.selectionEnd
      const start = this.reply.substring(0, textarea.selectionStart)
      const end = this.reply.substring(textarea.selectionStart)
      console.log(textarea, textarea.selectionEnd);
      this.reply += emoji.native;
      textarea.focus()
      this.$nextTick(() => {
        textarea.selectionEnd = cursorPosition + emoji.native.length
      })
    },
    toggleShowEmojiPicker: function() {
      this.showEmojiPicker = !this.showEmojiPicker;
    },
    send: function() {
      if (this.reply) {
        this.$emit('send', this.reply);
        this.reply = "";
      }
    }
  }
})
export default class ReplyBar extends Vue {}
</script>
<style lang="sass" scoped>
  .reply-bar
    display: flex
    margin-bottom: -30px
    button i
      transform: rotate(-90deg)
</style>
