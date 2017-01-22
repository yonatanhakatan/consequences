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
    this.props.onEntrySubmit(this.categoryInput.value);
  }

  renderElement() {
    switch (this.props.gameState) {
      case 'userTurn':
      case 'turnJustPlayed':
        return (
          <div>
            <div styleName="fold"></div>
            <div styleName="category">
              <label htmlFor="category-input">{this.props.categories[0].label}</label>
              <input
                type="text"
                id="category-input"
                ref={(input) => {
                  this.categoryInput = input;
                  if (this.categoryInput) {
                    this.categoryInput.focus();
                  }
                }}
              />
              <button onClick={this.submitEntry}>Submit</button>
            </div>
          </div>
        );
      case 'finished':
        return (
          <div>
            {this.props.categories && this.props.categories.map(category => (
              <div styleName="category" key={category.key}>
                {category.finalLabel && <div styleName="label">{category.finalLabel}</div>}
                <div>{category.value}</div>
              </div>
            ))}
          </div>
        );
      case 'turnEnded':
        return <div>It's now your opponent's turn.</div>;
      case 'notUserTurn':
        return <div>It's not currently your turn!</div>;
      default:
        return <div>Initialising...</div>;
    }
  }

  render() {
    const { gameState } = this.props;

    const classes = classNames({
      game: true,
      turnJustPlayed: gameState === 'turnJustPlayed',
      finished: gameState === 'finished',
    });

    return (
      <div styleName={classes}>
        {this.renderElement()}
        <Link to="/">Back to Home</Link>
      </div>
    );
  }
}

Game.propTypes = {
  categories: React.PropTypes.array,
  onEntrySubmit: React.PropTypes.func,
  gameState: React.PropTypes.string,
};

export default cssModules(Game, styles, { allowMultiple: true });
