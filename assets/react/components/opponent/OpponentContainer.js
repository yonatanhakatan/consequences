import React from 'react';

import Opponent from './Opponent';
import { showFriendSelector } from '../../utils/fb';

class OpponentContainer extends React.Component {

  componentDidMount() {
    showFriendSelector()
      .then(selectedFriend => {
        const opponentId = selectedFriend.to[0];
        this.props.initGame(opponentId);
      });
  }

  render() {
    return <Opponent />;
  }
}

OpponentContainer.propTypes = {
  initGame: React.PropTypes.func,
  user: React.PropTypes.object,
};

export default OpponentContainer;
