import { mount, createLocalVue, Wrapper } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import FabBtn from "@/components/FabBtn.vue";

describe("FabBtn.vue", () => {
  const routes = [
    { path: '/items/:item_id/edit', name: 'item-edit' }
  ];
  const router = new VueRouter({ routes });

  const icon = "check";
  const tooltip = {text: "new message", bottom: true};
  const color = "red";
  const size = "small";
  
  var wrapper: Wrapper<any>;

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuetify);

    wrapper = mount(FabBtn, {
      localVue: localVue,
      router,
      propsData: { icon, tooltip, color, size }
    });
  });

  it("renders tooltip text", () => {
    expect(wrapper.text()).toContain(tooltip.text);
  });

  it('has a button', () => {
    expect(wrapper.contains('button')).toBe(true);
  })

  it('renders the icon', () => {
    expect(wrapper.html()).toContain(icon + '</i>');
  })

  console.log("before")
  it('button click should emit select', () => {
    console.log("inside")
    const button = wrapper.find('button');
    button.trigger('click');
    expect(wrapper.emitted().select).toBeTruthy();
  })
  console.log("after")
});
