<template lang="pug">
  v-form.reply-bar(@submit.prevent="send")
    v-text-field(name="reply" v-model="reply" label="Reply" :disabled="disabled" autofocus single-line full-width hide-details)
    v-btn(fab small color="green" :disabled="disabled" @click="send")
      v-icon send
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: ["disabled"],
  data: () => ({
    reply: ""
  }),
  methods: {
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
