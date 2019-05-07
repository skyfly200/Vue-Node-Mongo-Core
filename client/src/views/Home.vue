<template lang="pug">
v-container(fluid='')
  .home
    h1 Welcome
    PublicChat()
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PublicChat from "@/components/PublicChat.vue";

@Component({
  components: {PublicChat}
})
export default class Home extends Vue {}
</script>

<style lang="sass" scoped></style>
