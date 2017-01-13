import React from 'react';
import cssModules from 'react-css-modules';
import classNames from 'classnames';

import styles from './Game.scss';

class Game extends React.Component {

  constructor() {
    super();
    this.submitEntry = this.submitEntry.bind(this);
    this.turnJustPlayed = false;
  }

  submitEntry() {
    this.turnJustPlayed = true;
    // Not ideal but trying to avoid
    // using state because the paper turn
    // effect is a trivial cosmetic effect
    this.forceUpdate();
    // Wait for paper turn animation to complete
    // before updating state
    setInterval(() => {
      this.props.onEntrySubmit(this.entryInput.value);
    }, 1500);
  }

  render() {
    const classes = classNames({
      game: true,
      turnJustPlayed: this.turnJustPlayed,
    });

    return (
      <div styleName={classes}>
        {this.props.isUsersTurn ? (
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
        ) : (
          <div>It's not currently your turn!</div>
        )}
      </div>
    );
  }
}

Game.propTypes = {
  currentLabel: React.PropTypes.string,
  onEntrySubmit: React.PropTypes.func,
  isUsersTurn: React.PropTypes.bool,
};

export default cssModules(Game, styles, { allowMultiple: true });
