<template lang="pug">
  .profile
    h1 {{ username }}'s Profile
</template>

<script>
export default {
  name: "Profile",
  computed: {
    username: function() {
      return this.$store.getters.user.username;
    }
  }
};
</script>

<style lang="sass" scoped></style>
