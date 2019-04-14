<template>
  <div class="profile">
    <h1>{{ username }}'s Profile</h1>
  </div>
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
