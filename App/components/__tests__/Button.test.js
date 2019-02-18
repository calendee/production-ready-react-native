import React from 'react';
import { TouchableOpacity } from 'react-native';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ClearButton } from '../Button';

configure({ adapter: new Adapter() });

it('handles a press', () => {
  const callback = jest.fn();
  const wrapper = shallow(<ClearButton text="Test 1" onPress={callback} />);

  expect(wrapper.find(TouchableOpacity).length).toBe(1);

  wrapper
    .find(TouchableOpacity)
    .first()
    .props()
    .onPress();
  expect(callback).toHaveBeenCalledTimes(1);
});
