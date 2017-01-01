import React from 'react';
import { shallow } from 'enzyme';

import FriendSelector from './FriendSelector';
import { FRIENDS } from '../../mocks/friends';

describe('FriendSelector', () => {
  it('should display the correct number of friends provided', () => {
    const element = shallow(<FriendSelector friends={FRIENDS} />);
    expect(element.find('li').length).toEqual(FRIENDS.length);
  });

  it('The first friend should have the correct name', () => {
    const element = shallow(<FriendSelector friends={FRIENDS} />);
    expect(element.find('li')
      .first()
      .find('button > div')
      .first()
      .text()).toEqual(FRIENDS[0].name);
  });

  it('should call the onFriendSelection callback with the correct friend data', () => {
    const onFriendSelection = { callback: () => {} };
    spyOn(onFriendSelection, 'callback').and.callThrough();
    const element = shallow(<FriendSelector friends={FRIENDS} selectFriend={onFriendSelection.callback} />);
    element.find('li')
      .first()
      .find('button')
      .first()
      .simulate('click');
    expect(onFriendSelection.callback).toHaveBeenCalledWith(FRIENDS[0]);
  });
});
