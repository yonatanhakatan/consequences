import React from 'react';
import { shallow } from 'enzyme';
import Welcome from './Welcome';

describe('Welcome', () => {
  it('should contain 2 buttons', () => {
    const element = shallow(<Welcome />);
    expect(element.find('button').length).toEqual(2);
  });
});
