import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import AddContact from '../../src/views/AddContact.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(AddContact, {
      propsData: { msg },
    });
    expect(wrapper.text()).to.include(msg);
  });
});
