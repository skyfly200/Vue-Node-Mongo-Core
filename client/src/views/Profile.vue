<template lang="pug">
  .profile
    h1 {{ titleCase(username) }}'s Profile
</template>

<script>
export default {
  name: "Profile",
  computed: {
    username: function() {
      return this.$store.getters.user.username;
    }
  },
  methods: {
    titleCase: function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
};
</script>

<style lang="sass" scoped></style>
