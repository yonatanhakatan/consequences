import React from 'react';
import { browserHistory } from 'react-router';

import { fbLogin } from '../../utils/auth';

import Welcome from './Welcome';

class WelcomeContainer extends React.Component {

  constructor() {
    super();
    this.startGame = this.startGame.bind(this);
  }

  startGame() {
    if (this.props.user.authenticated) {
      browserHistory.push('/auth/opponent');
    } else {
      fbLogin()
        .then(() => {
          browserHistory.push('/auth/opponent');
        });
    }
  }

  render() {
    return (
      <Welcome startGame={this.startGame} />
    );
  }
}

WelcomeContainer.propTypes = {
  user: React.PropTypes.object,
};

export default WelcomeContainer;
