<template lang="pug">
v-container(fluid grid-list-md).groups
  v-layout.heading
    v-flex.title
      h1 Find Groups to Join
    v-flex.search
      v-text-field.search-field(:model="query" label="Search Groups" @change="filter" solo)
  v-layout.body
    v-flex.group-list
      v-card.group(v-for="group in groups")
        v-img(:src="group.img")
        v-card-title
          h2 {{ titleCase(group.title) }}
        v-card-text
          p Created {{ dateFormat(group.created) }}
          p Has {{ group.members }} members
        v-card-actions
          v-spacer
          v-btn(:to="'/group/' + group.title" flat) Visit
    v-flex.new-group
      h3 Don't see what your looking for?
      v-btn(@click="" color="primary") Create a New Group
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  data: () => ({
    query: "",
    groups: [
      {title: "test", img: "http://lorempixel.com/800/200/nature", created: new Date(), members: 2}
    ]
  }),
  methods: {
    filter: function() {},
    dateFormat: function(d) {
      let date = new Date(d);
      return this.monthFormat(date) + " " + date.getFullYear();
    },
    monthFormat: function(date) {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      return months[date.getMonth()];
    },
    titleCase: function(string) {
      if (string) return string.charAt(0).toUpperCase() + string.slice(1);
      else return "";
    },
  }
})
export default class Groups extends Vue {}
</script>

<style lang="sass" scoped>
.layout
  display: flex
  flex-direction: column
.flex
  display: flex
  justify-content: center
.search-field
  max-width: 400px
.group
  width: 400px
.new-group
  margin: 10em auto
  flex-direction: column
</style>
