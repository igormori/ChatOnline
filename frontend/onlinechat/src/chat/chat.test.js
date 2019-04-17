import React from 'react';
import { shallow } from 'enzyme';
import Chat from './chat';

describe('<Chat />', () => {
  test('renders', () => {
    const wrapper = shallow(<Chat />);
    expect(wrapper).toMatchSnapshot();
  });
});
