//import { expect } from "chai";
var expect = require('expect')
import { shallowMount } from "@vue/test-utils";
import FabBtn from "@/components/FabBtn.vue";

describe("FabBtn.vue", () => {
  const icon = "check";
  const tooltip = {text: "new message", bottom: true};
  const color = "red";
  const size = "small";
  const wrapper = shallowMount(FabBtn, {
    propsData: { icon, tooltip, color, size }
  });
  console.log(wrapper.html())

  it("renders tooltip text", () => {
    expect(wrapper.text()).toContain(tooltip.text);
  });

  // it('renders the correct markup', () => {
  //   expect(wrapper.html()).contain('<span class="count">0</span>')
  // })

  // it's also easy to check for the existence of elements
  // it('has a button', () => {
  //   expect(wrapper.contains('v-button')).to.equal(true)
  // })

  // it('button click should emit select', () => {
  //   const button = wrapper.find('v-btn')
  //   button.trigger('click')
  //   // assert select is emited
  // })
});
