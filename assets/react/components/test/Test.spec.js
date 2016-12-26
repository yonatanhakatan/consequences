import React from 'react';
import { shallow } from 'enzyme';
import Test from './Test';

describe('Test', () => {
  it('should contain a span element', () => {
    const element = shallow(<Test />);
    expect(element.find('span').length).toEqual(1);
  });
});
