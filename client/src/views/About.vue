<template lang="pug">
v-container(fluid grid-list-md).about
  v-layout.layout
    v-flex.heading
      h1 This is an about page
</template>

<script>
export default {
  name: "About"
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
