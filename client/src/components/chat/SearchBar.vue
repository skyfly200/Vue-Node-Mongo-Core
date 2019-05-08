<template lang="pug">
  v-toolbar.convo-toolbar(flat dense)
    v-text-field.search-field(flat full-width hide-details single-line clearable name="search" v-model="query" @input="$emit('query', query)" label="Search"
      prepend-inner-icon="search"
      append-icon="filter_list"
      append-outer-icon="add_circle"
      @click:append="$emit('filter')"
      @click:append-outer="$emit('new')")
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: [],
  data: function() {
    return {
      query: ""
    }
  }
})
export default class SearchBar extends Vue {}
</script>
<style lang="sass" scoped></style>
