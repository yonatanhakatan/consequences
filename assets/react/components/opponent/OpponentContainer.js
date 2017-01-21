import React from 'react';

import { sendAppRequest as sendFbAppRequest } from '../../utils/fb';

import Opponent from './Opponent';

class OpponentContainer extends React.Component {

  constructor() {
    super();
    this.selectFriend = this.selectFriend.bind(this);
  }

  componentDidMount() {
    this.props.getFbFriends();
  }

  selectFriend(friend) {
    sendFbAppRequest(friend.id, 'Come and play Consequences!')
      .then(selectedFriend => {
        this.props.initGame({
          id: selectedFriend.to[0],
          name: friend.name,
          picture: friend.picture.data.url,
        });
      });
  }

  render() {
    return <Opponent friends={this.props.user.friends} selectFriend={this.selectFriend} />;
  }
}

OpponentContainer.propTypes = {
  initGame: React.PropTypes.func,
  user: React.PropTypes.object,
  getFbFriends: React.PropTypes.func,
};

export default OpponentContainer;
