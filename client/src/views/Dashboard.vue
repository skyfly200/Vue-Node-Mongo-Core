<template lang="pug">
  .dashboard
    h1 Welcome to the dashboard {{ username }}
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
