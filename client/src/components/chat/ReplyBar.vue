<template lang="pug">
  .reply
    v-form.reply-bar(@submit.prevent="send")
      v-textarea.reply-input(autofocus auto-grow single-line full-width hide-details solo
        name="reply" ref="textarea" rows=1
        append-icon="insert_emoticon"
        @click:append.prevent="toggleShowEmojiPicker"
        @input="parseReply"
        v-model="reply" label="Reply" :disabled="disabled")
      v-menu(v-model="showEmojiPicker" activator="textarea" :close-on-content-click="false" :disabled="disabled")
        Picker(v-show="showEmojiPicker" style="width: auto !importiant" title="Select Emoji" emoji="point_up" set="messenger" @select="addEmoji")
      v-btn(fab small color="green" :disabled="disabled" @click="send")
        v-icon send
    v-card.link-loader(v-show="previewState === 'loading'")
      v-progress-circular(indeterminate)
    v-card.link-preview(v-show="previewState === 'show'" flat :href="preview.url" target="_blank")
      v-layout(row)
        v-flex(xs3)
          v-img(v-show="preview.image" :src="preview.image" contain)
        v-flex(xs9)
          v-card-actions
            v-spacer
            v-icon(small @click.prevent="clearPreview") close
          v-card-title
            .link-title {{ preview.title }}
            .description {{ preview.description }}
            .url {{ preview.url }}
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
    clearPreview: function() {
      this.preview = {};
      this.previewState = "none";
    },
    parseReply: function() {
      var url = this.urlify(this.reply);
      if (url && url[0] && this.previewState === "none") {
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
  .link-loader
    width: 100%
    text-align: center
    margin-top: 10px
    overflow: hidden
  .link-preview
    height: auto
    margin-top: 10px
    .v-card__title
      padding: 0
      padding-left: 10px
    .link-title
      font: 1.5em bold
      padding-bottom: 0.2em
    .description
    .url
      color: grey
      font-size: 0.9em
      margin-top: 0.5em
</style>
