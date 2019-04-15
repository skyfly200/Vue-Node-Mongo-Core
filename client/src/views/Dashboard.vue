<template lang="pug">
v-container(fluid grid-list-md).dashboard
  v-layout.layout
    v-flex.heading
      h1 Welcome to the dashboard {{ username }}
    v-flex.body
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

<style lang="sass" scoped>
.layout
  display: flex
  flex-direction: column
.flex
  display: flex
  justify-content: center
</style>
