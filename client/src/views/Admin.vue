<template lang="pug">
v-container(fluid grid-list-md).admin-dashboard
  v-layout.layout
    v-flex.heading
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

<style lang="sass" scoped>
.layout
  display: flex
  flex-direction: column
.flex
  display: flex
  justify-content: center
</style>
