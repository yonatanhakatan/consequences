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

  usersTurnGames() {
    const { games } = this.props;

    return Object.keys(games)
      .filter((gameId) => (games[gameId].turn === this.props.user.fb.id))
      .map((gameId) => {
        const game = games[gameId];

        let opponentKey = 'hostFbUser';
        if (game[opponentKey].id === this.props.user.fb.id) {
          opponentKey = 'opponentFbUser';
        }

        return { gameId, opponentFbUser: game[opponentKey] };
      });
  }

  render() {
    return (
      <Welcome usersTurnGames={this.usersTurnGames()} startGame={this.startGame} />
    );
  }
}

WelcomeContainer.propTypes = {
  user: React.PropTypes.object,
  games: React.PropTypes.object,
};

export default WelcomeContainer;
