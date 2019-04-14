<template lang="pug">
  .dashboard
    h1 Welcome to the dashboard {{ username }}
    v-btn(primary to="/profile")
      v-icon person
      span Your Profile
    v-btn(primary to="/groups")
      v-icon people
      span Your Groups
</template>

<script>
export default {
  name: "Dashboard",
  computed: {
    username: function() {
      return this.$store.getters.user.username;
    }
  }
};
</script>

<style lang="sass" scoped></style>
