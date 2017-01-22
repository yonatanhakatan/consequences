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
        <tr><th>Opponent</th><th>Status</th></tr>
        {items}
      </table>
    );
  };

  return (
    <div styleName={classes}>
      <div>
        <button onClick={props.startGame}>Start Game</button>
        {(props.currentGames.length > 0) &&
          <div styleName="currentGames">
            These are the games you are currently involved in...
            {renderCurrentGames()}
          </div>
        }
      </div>
    </div>
  );
};

Welcome.propTypes = {
  startGame: React.PropTypes.func,
  currentGames: React.PropTypes.array,
};

export default cssModules(Welcome, styles, { allowMultiple: true });
