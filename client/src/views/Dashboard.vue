<template lang="pug">
  .dashboard
    h1 Welcome to the dashboard {{ username }}
</template>

<script>
export default {
  name: "App",
  computed: {
    username: function() {
      return this.$store.getters.user.username;
    }
  }
};
</script>
