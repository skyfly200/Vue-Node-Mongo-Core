<template lang="pug">
v-container(fluid grid-list-md).groups
  v-layout.layout
    v-flex.heading
      h1 Find Groups to Join
</template>

<script>
export default {
  name: "Groups"
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
