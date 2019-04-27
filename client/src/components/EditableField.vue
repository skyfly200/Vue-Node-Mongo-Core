<template lang="pug">
.editable
  .view(v-if="!editing")
    .field-value
      h3 {{ title }}:&nbsp;
      span {{ value }}
    v-spacer
    FabBtn(v-on:select="edit" :tooltip="{text: 'Change Username', left: true}" icon="person").edit-btn
  v-form.edit(v-else)
    .field-edit
      v-text-area(v-if="textarea" :name="title" :label="title" :value="value")
      v-text-field(v-else :name="title" :label="title" :value="value")
    v-btn(@click="editing = false") Cancel
    v-btn(@click="") Save
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
import FabBtn from "@/components/FabBtn.vue";

@Component({
  components: { FabBtn },
  props: ["title", "v", "textarea"],
  data: () => ({
    editing: false,
    value: ""
  }),
  created() {
    this.value = this.v;
  },
  methods: {
    edit: function() {
      this.editing = true;
    },
    save: function() {}
  }
})
export default class EditableField extends Vue {}
</script>
<style lang="sass" scoped>
.view, .field-value
  display: flex
.field-value
  margin: auto
</style>
