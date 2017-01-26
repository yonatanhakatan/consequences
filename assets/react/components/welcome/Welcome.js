import React from 'react';
import cssModules from 'react-css-modules';
import classNames from 'classnames';
import { Link } from 'react-router';

import styles from './Welcome.scss';

const Welcome = (props) => {
  const classes = classNames({
    welcome: true,
  });

  const renderCurrentGames = () => {
    const items = props.currentGames.map((game) => {
      const { gameId, opponentFbUser, status } = game;
      const gameUrl = `/auth/game/${gameId}`;

      return (
        <tr key={gameId}>
          <td>
            <Link to={gameUrl}>
              <img src={opponentFbUser.picture} role="presentation" />
              {opponentFbUser.name}
            </Link>
          </td>
          <td>
            <Link to={gameUrl}>{status}</Link>
          </td>
        </tr>
      );
    });

    return (
      <table>
        <thead>
          <tr><th>Opponent</th><th>Status</th></tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </table>
    );
  };

  const renderCheck = () => {
    if (props.user.authenticated) {
      const content = [<button key="welcomeStart" onClick={props.startGame}>Start Game</button>];

      if (props.currentGames.length > 0) {
        content.push(
          <div styleName="currentGames" key="welcomeCurrentGames">
            These are the games you are currently involved in...
            {renderCurrentGames()}
          </div>
        );
      }

      return content;
    }

    if (props.user.authenticated === false) {
      return (
        <button styleName="fbLogin" onClick={props.attemptFbAuth}>
          <img src="../../../images/fb_login.png" alt="Login with Facebook" />
        </button>
      );
    }

    return null;
  };

  return (
    <div styleName={classes}>
      <div>
        {renderCheck()}
      </div>
    </div>
  );
};

Welcome.propTypes = {
  startGame: React.PropTypes.func,
  currentGames: React.PropTypes.array,
  user: React.PropTypes.object,
  attemptFbAuth: React.PropTypes.func,
};

export default cssModules(Welcome, styles, { allowMultiple: true });
