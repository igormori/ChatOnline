import React from 'react';
import { shallow } from 'enzyme';
import AdminPanel from './adminPanel';

describe('<AdminPanel />', () => {
  test('renders', () => {
    const wrapper = shallow(<AdminPanel />);
    expect(wrapper).toMatchSnapshot();
  });
});
