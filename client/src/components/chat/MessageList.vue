<template lang="pug">
  .messages
    v-fade-transition(group)
      Message.message(v-for="m in conversation.messages"
        :key="getTime(m.timestamp)"
        :author="m.author",
        :avatar="getAvatar(m.author)",
        :body="m.body",
        :timestamp="formatTimestamp(m.timestamp)",
        :own="m.author === username",
        :showName="isMulti && m.author !== username")
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
import Message from "@/components/chat/Message.vue";
// import date-fns utils
const isToday = require('date-fns/is_today');
const isThisWeek = require('date-fns/is_this_week');
const isThisYear = require('date-fns/is_this_year');
const getTime = require('date-fns/get_time');
const format = require('date-fns/format');

@Component({
  components: {Message},
  props: ["conversation", "contacts"],
  computed: {
    username: function() {
      return this.$store.getters.isLoggedIn ? this.$store.getters.getUser.username : "";
    },
    isMulti: function() {
      return this.conversation.members.length > 2;
    }
  },
  methods: {
    formatTimestamp: function(t) {
      let f = isToday(t) ? format(t, "h:mm a") : (isThisWeek(t) ? format(t, "ddd") : (isThisYear ? format(t, "MMM Do") : format(t, "M/D/YY")));
      return f;
    },
    getTime: getTime,
    getAvatar: function(author) {
      var member = this.contacts.find( (m) => m.username === author );
      return member ? member.avatar : "";
    },
  }
})
export default class MessageList extends Vue {}
</script>
<style lang="sass" scoped>
.messages
  height: 100%
  display: flex
  flex-direction: column
  justify-content: flex-end
</style>
