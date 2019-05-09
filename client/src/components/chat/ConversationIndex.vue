<template lang="pug">
  v-flex.conversations(sm4)
    SearchBar(@new="$emit('new')" @query="updateQuery($event)" @filter="showFilters = !showFilters ? -1 : 0")
    Filters(:show="showFilters" @filter="updateFilters($event)")
    ConvoList(:conversations="filteredConversations" @select="$emit('select', $event)" @delete="$emit('delete', $event)")
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
import SearchBar from "@/components/chat/SearchBar.vue";
import Filters from "@/components/chat/Filters.vue";
import ConvoList from "@/components/chat/ConvoList.vue";

@Component({
  components: {SearchBar, Filters, ConvoList},
  props: ["conversations"],
  data: function() {
    return {
      query: "",
      showFilters: -1,
      filters: {
        direct: true,
        group: true,
        created: false,
        unread: false
      }
    }
  },
  computed: {
    filteredConversations: function() {
      return this.conversations.filter( c => {
        let unread = !this.filters.unread || c.unread || c.messages.length === 0;
        let created = !this.filters.created || c.creator === this.$store.getters.getUser.username;
        let direct = this.filters.direct || c.members.length > 2;
        let group = this.filters.group || c.members.length < 3;
        // filter by query here
        let query = this.query === "" || this.query === null ||
          c.members.find( m => ( m.username.toLowerCase().includes(this.query.toLowerCase()) ))
          || c.title.toLowerCase().includes(this.query.toLowerCase());
        return (unread && created && direct && group && query);
      });
    }
  },
  methods: {
    updateQuery: function(query) {
      this.query = query;
    },
    updateFilters: function(filters) {
      this.filters = filters;
    }
  }
})
export default class ConversationIndex extends Vue {}
</script>
<style lang="sass" scoped></style>
