import React from 'react';
import cssModules from 'react-css-modules';
import classNames from 'classnames';
import { Link } from 'react-router';

import styles from './Welcome.scss';

const Welcome = (props) => {
  const classes = classNames({
    welcome: true,
  });

  const renderUsersTurnGames = () => {
    const items = props.usersTurnGames.map((game) => {
      const { gameId, opponentFbUser } = game;

      return (
        <li key={gameId}>
          <Link to={`/auth/game/${gameId}`}>
            <img src={opponentFbUser.picture} role="presentation" />
            {opponentFbUser.name}
          </Link>
        </li>
      );
    });

    return <ul>{items}</ul>;
  };

  return (
    <div styleName={classes}>
      <div>
        <button onClick={props.startGame}>Start Game</button>
        {(props.usersTurnGames.length > 0) &&
          <div styleName="usersTurn">
            It's your turn in the following games...
            {renderUsersTurnGames()}
          </div>
        }
      </div>
    </div>
  );
};

Welcome.propTypes = {
  startGame: React.PropTypes.func,
  usersTurnGames: React.PropTypes.array,
};

export default cssModules(Welcome, styles, { allowMultiple: true });
