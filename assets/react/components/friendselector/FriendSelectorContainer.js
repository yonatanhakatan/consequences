import React from 'react';

import FriendSelector from './FriendSelector';

const FriendSelectorContainer = (props) => (
  <FriendSelector friends={props.friends} selectFriend={props.selectFriend} />
);

FriendSelectorContainer.propTypes = {
  friends: React.PropTypes.array,
  selectFriend: React.PropTypes.func,
};

export default FriendSelectorContainer;
