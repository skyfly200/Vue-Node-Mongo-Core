<template lang="pug">
  .admin-dashboard
    h1 Welcome to the admin portal {{ username }}
</template>

<script>
export default {
  name: "Admin",
  computed: {
    username: function() {
      return this.$store.getters.user.username;
    }
  }
};
</script>

<style lang="sass" scoped></style>
