import React from 'react';

import Game from './Game';

class GameContainer extends React.Component {

  constructor() {
    super();
    this.initialGameStateSet = false;
    this.onEntrySubmit = this.onEntrySubmit.bind(this);
  }

  componentDidUpdate() {
    if (!this.initialGameStateSet) {
      const gameData = this.props.games[this.props.params.gameId];

      if (gameData) {
        if (!gameData.manName) {
          this.currentKey = 'manName';
          this.currentLabel = 'Enter a man\'s name';
        } else if (!gameData.womanName) {
          this.currentKey = 'womanName';
          this.currentLabel = 'Enter a woman\'s name';
        } else if (!gameData.location) {
          this.currentKey = 'location';
          this.currentLabel = 'At';
        } else if (!gameData.manSaid) {
          this.currentKey = 'manSaid';
          this.currentLabel = 'He Said';
        } else if (!gameData.womanSaid) {
          this.currentKey = 'womanSaid';
          this.currentLabel = 'She Said';
        } else if (!gameData.andThen) {
          this.currentKey = 'andThen';
          this.currentLabel = 'And Then';
        }

        if (gameData.turn === this.props.user.fbId) {
          this.props.updateUserGameState(this.props.params.gameId, 'userTurn');
        } else {
          this.props.updateUserGameState(this.props.params.gameId, 'notUserTurn');
        }
        this.initialGameStateSet = true;
      }
    }
  }

  onEntrySubmit(val) {
    this.props.updateUserGameState(this.props.params.gameId, 'turnJustPlayed');
    setInterval(() => {
      this.props.updateUserGameState(this.props.params.gameId, 'turnEnded');
      this.props.updateGameValue(this.props.params.gameId, this.currentKey, val);
    }, 1500);
  }

  render() {
    return (
      <Game
        gameState={this.props.user.gameState[this.props.params.gameId]}
        currentLabel={this.currentLabel}
        onEntrySubmit={this.onEntrySubmit}
      />
    );
  }
}

GameContainer.propTypes = {
  params: React.PropTypes.object,
  games: React.PropTypes.object,
  user: React.PropTypes.object,
  updateGameValue: React.PropTypes.func,
  updateUserGameState: React.PropTypes.func,
};

export default GameContainer;
