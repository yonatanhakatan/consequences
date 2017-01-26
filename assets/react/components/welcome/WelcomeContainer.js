import React from 'react';
import { browserHistory } from 'react-router';

import { fbLogin } from '../../utils/auth';

import Welcome from './Welcome';

class WelcomeContainer extends React.Component {

  constructor() {
    super();
    this.startGame = this.startGame.bind(this);
  }

  attemptFbAuth() {
    fbLogin();
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

  currentGames() {
    const { games } = this.props;

    return Object.keys(games)
      .map((gameId) => {
        const game = games[gameId];

        let opponentKey = 'hostFbUser';

        if (game[opponentKey].id === this.props.user.fb.id) {
          opponentKey = 'opponentFbUser';
        }

        let status = 'Finished';
        if (!game.andThen) {
          if (games[gameId].turn === this.props.user.fb.id) {
            status = 'Your Turn';
          } else {
            status = `${game[opponentKey].name}'s turn`;
          }
        }

        return { gameId, opponentFbUser: game[opponentKey], status };
      });
  }

  render() {
    return (
      <Welcome
        currentGames={this.currentGames()}
        startGame={this.startGame}
        user={this.props.user}
        attemptFbAuth={this.attemptFbAuth}
      />
    );
  }
}

WelcomeContainer.propTypes = {
  user: React.PropTypes.object,
  games: React.PropTypes.object,
};

export default WelcomeContainer;
