<template lang="pug">
v-container(fluid grid-list-md).verify-email
  v-layout.layout
    v-flex.heading
      h1 Welcome {{ username }}
    v-flex.body
      h3 {{ message }}
    v-flex.action
      v-btn(to="/login" v-if="verified") Login
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  data: () => ({
    verified: false,
    username: "",
    message: "Checking Token"
  }),
  created() {
    this.$store.dispatch("logout");
    this.username = this.$route.params.username;
    this.$http({
      url:
        "http://localhost:1234/users/verify/email/" +
        this.username +
        "/" +
        this.$route.params.token,
      data: { username: this.username },
      method: "GET"
    })
      .then(resp => {
        if (resp.data.err) {
          console.error(resp.data.err);
        } else {
          this.message = resp.data.result;
          this.verified = true;
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
})
export default class VerifyEmail extends Vue {}
</script>

<style lang="sass" scoped>
.layout
  display: flex
  flex-direction: column
.flex
  display: flex
  justify-content: center
</style>
