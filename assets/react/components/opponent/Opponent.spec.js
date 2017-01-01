import React from 'react';
import { shallow } from 'enzyme';

import Opponent from './Opponent';

describe('Opponent', () => {
  it('should contain a single FriendSelectorContainer component', () => {
    const element = shallow(<Opponent />);
    expect(element.find('FriendSelectorContainer').length).toEqual(1);
  });
});
