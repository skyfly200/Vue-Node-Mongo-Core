<template lang="pug">
  .reply
    Picker(v-show="showEmojiPicker" title="Pick your emoji..." emoji="point_up" set="messenger" @select="addEmoji")
    v-form.reply-bar(@submit.prevent="send")
      v-textarea(autofocus auto-grow single-line full-width hide-details solo
        name="reply" ref="textarea" rows=1
        append-outer-icon="insert_emoticon"
        @input="parseReply"
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
    debounce: function(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this;
        var args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    },
    parseReply: function() {
      console.log("ran")
      var url = this.urlify(this.reply);
      var getPreview = this.debounce(this.getLinkPreview(url[0]), 3000);
      if (url && url[0]) getPreview();
    },
    getLinkPreview: function(url) {
      this.$http.post('https://api.linkpreview.net', {
          q: url,
          key: '5cd91310830534140fe6a9358de3c9d660225c4c2fcb4'
        }).then(resp => {
          console.log(resp.data)
        }).catch(error => {});
    },
    urlify: function(text) {
      var urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
      return text.match(urlRegex);
    },
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
