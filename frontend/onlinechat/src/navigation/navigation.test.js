import React from 'react';
import { shallow } from 'enzyme';
import Navigation from './navigation';

describe('<Navigation />', () => {
  test('renders', () => {
    const wrapper = shallow(<Navigation />);
    expect(wrapper).toMatchSnapshot();
  });
});
