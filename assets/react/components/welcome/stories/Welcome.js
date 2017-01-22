import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import Welcome from '../Welcome';
import { USER_TURN_GAMES } from '../../../mocks/userTurnGames';

storiesOf('Welcome', module)
  .add('regular state', () => (
    <Welcome startGame={action('Start Game')} usersTurnGames={USER_TURN_GAMES} />
  ));
