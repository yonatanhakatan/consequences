import React from 'react';
import cssModules from 'react-css-modules';
import classNames from 'classnames';
import { Link } from 'react-router';

import styles from './Game.scss';

class Game extends React.Component {

  constructor() {
    super();
    this.submitEntry = this.submitEntry.bind(this);
    this.renderElement = this.renderElement.bind(this);
  }

  submitEntry() {
    this.props.onEntrySubmit(this.entryInput.value);
  }

  renderElement() {
    switch (this.props.gameState) {
      case 'userTurn':
      case 'turnJustPlayed':
        return (
          <div>
            <div styleName="fold"></div>
            <div styleName="entry">
              <label htmlFor="entry-input">{this.props.currentLabel}</label>
              <input
                type="text"
                id="entry-input"
                ref={(input) => {
                  this.entryInput = input;
                  if (this.entryInput) {
                    this.entryInput.focus();
                  }
                }}
              />
              <button onClick={this.submitEntry}>Submit</button>
            </div>
          </div>
        );
      case 'turnEnded':
        return <div>It's now your opponent's turn. <Link to="/">Back to Home</Link></div>;
      case 'notUserTurn':
        return <div>It's not currently your turn! <Link to="/">Back to Home</Link></div>;
      default:
        return <div>Initialising...</div>;
    }
  }

  render() {
    const classes = classNames({
      game: true,
      turnJustPlayed: this.props.gameState === 'turnJustPlayed',
    });

    return (
      <div styleName={classes}>
        {this.renderElement()}
      </div>
    );
  }
}

Game.propTypes = {
  currentLabel: React.PropTypes.string,
  onEntrySubmit: React.PropTypes.func,
  gameState: React.PropTypes.string,
};

export default cssModules(Game, styles, { allowMultiple: true });
