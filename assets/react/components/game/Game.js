import React from 'react';
import cssModules from 'react-css-modules';
import classNames from 'classnames';

import styles from './Game.scss';

class Game extends React.Component {

  componentDidMount() {
    if (this.props.isUsersTurn) {
      this.entryInput.focus();
    }
  }

  render() {
    const classes = classNames({
      game: true,
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
                ref={(input) => { this.entryInput = input; }}
              />
            </div>
            <button onClick={() => { this.props.onEntrySubmit(this.entryInput.value); }}>Submit</button>
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
