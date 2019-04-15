<template lang="pug">
v-container(fluid grid-list-md).error-404
  v-layout.layout
    v-flex.heading
      h1 404
      h2 Page not found
      router-link(to="/") Back to Home
      h4 Email webmaster about broken links
</template>

<script>
export default {
  name: "404"
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
