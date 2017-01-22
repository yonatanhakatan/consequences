import React from 'react';

import Game from './Game';
import { GAME_CATEGORIES } from '../../constants/game';

class GameContainer extends React.Component {

  constructor() {
    super();
    this.currentKey = null;
    this.onEntrySubmit = this.onEntrySubmit.bind(this);
    this.checkGameDataAvailable = this.checkGameDataAvailable.bind(this);
  }

  componentDidMount() {
    this.checkGameDataAvailable();
  }

  componentDidUpdate() {
    this.checkGameDataAvailable();
  }

  componentWillUnmount() {
    this.currentKey = null;
  }

  onEntrySubmit(val) {
    this.props.updateUserGameState(this.props.params.gameId, 'turnJustPlayed');
    setInterval(() => {
      this.props.updateUserGameState(this.props.params.gameId, 'turnEnded');
      this.props.updateGameValue(this.props.params.gameId, this.currentKey, val);
    }, 1500);
  }

  checkGameDataAvailable() {
    if (!this.currentKey) {
      const gameData = this.props.games[this.props.params.gameId];

      if (gameData) {
        for (const labelData of GAME_CATEGORIES) {
          if (!gameData[labelData.key]) {
            this.currentKey = labelData.key;
            this.currentCategories = [{
              label: labelData.initialLabel,
            }];
            break;
          }
        }

        if (!this.currentKey) {
          this.currentKey = 'finished';
          this.currentCategories = GAME_CATEGORIES.map((label) => {
            const labelItem = label;
            labelItem.value = gameData[label.key];

            return labelItem;
          });
        }

        if (this.currentKey === 'finished') {
          this.props.updateUserGameState(this.props.params.gameId, 'finished');
        } else {
          if (gameData.turn === this.props.user.fb.id) {
            this.props.updateUserGameState(this.props.params.gameId, 'userTurn');
          } else {
            this.props.updateUserGameState(this.props.params.gameId, 'notUserTurn');
          }
        }

        this.forceUpdate();
      }
    }
  }

  render() {
    return (
      <Game
        gameState={this.props.user.gameState[this.props.params.gameId]}
        categories={this.currentCategories}
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
