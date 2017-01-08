import React from 'react';

import Game from './Game';

const GameContainer = (props) => {
  let currentLabel;
  let currentKey;
  let currentValue;
  let isUsersTurn = false;
  const gameData = props.games[props.params.gameId];
  if (gameData) {
    if (!gameData.manName) {
      currentKey = 'manName';
      currentLabel = 'Enter a man\'s name';
    } else if (!gameData.womanName) {
      currentKey = 'womanName';
      currentLabel = 'Enter a woman\'s name';
    } else if (!gameData.location) {
      currentKey = 'location';
      currentLabel = 'At';
    } else if (!gameData.manSaid) {
      currentKey = 'manSaid';
      currentLabel = 'He Said';
    } else if (!gameData.womanSaid) {
      currentKey = 'womanSaid';
      currentLabel = 'She Said';
    } else if (!gameData.andThen) {
      currentKey = 'andThen';
      currentLabel = 'And Then';
    }

    if (gameData.turn === props.user.fbId) {
      isUsersTurn = true;
    }
  }


  const onEntrySubmit = (val) => {
    currentValue = val;
    props.updateGameValue(props.params.gameId, currentKey, currentValue);
  };

  return <Game isUsersTurn={isUsersTurn} currentLabel={currentLabel} onEntrySubmit={onEntrySubmit} />;
};

GameContainer.propTypes = {
  params: React.PropTypes.object,
  games: React.PropTypes.object,
  user: React.PropTypes.object,
  updateGameValue: React.PropTypes.func,
};

export default GameContainer;
