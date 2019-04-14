<template lang="pug">
  .error-404
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

<style lang="sass" scoped></style>
