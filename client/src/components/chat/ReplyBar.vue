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
    v-card.link-preview(v-show="preview.title" flat :href="preview.url" target="_blank")
      v-card-title
        h1 {{ preview.title }}
      v-card-text.preview-body
        v-img(:src="preview.image" height="")
        p {{ preview.description }}
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
import { Picker } from 'emoji-mart-vue';
import _ from 'lodash';

@Component({
  components: {Picker},
  props: ["disabled"],
  data: () => ({
    reply: "",
    preview: {},
    previewState: "none",
    showEmojiPicker: false
  }),
  methods: {
    parseReply: function() {
      var url = this.urlify(this.reply);
      if (url && url[0]) {
        this.previewState = "loading";
        this.getLinkPreview(this, url[0]);
      }
    },
    getLinkPreview: _.debounce((context, url) => {
      context.$http.post('https://api.linkpreview.net', {
          q: url,
          key: '5cd91310830534140fe6a9358de3c9d660225c4c2fcb4'
        }).then(resp => {
          context.preview = resp.data;
          context.previewState = "show";
        }).catch(error => {});
    }, 3000),
    urlify: function(text) {
      // this is not quite the best URL regex
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
        this.preview = {};
        this.previewState = "none";
      }
    }
  }
})
export default class ReplyBar extends Vue {}
</script>
<style lang="sass" scoped>
  .reply
    margin-bottom: -30px
  .reply-bar
    display: flex
    button i
      transform: rotate(-90deg)
  .link-preview
    height: auto
    margin-top: 5px
  .preview-body
    display: flex
</style>
