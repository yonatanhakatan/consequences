import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import Welcome from '../Welcome';
import { CURRENT_GAMES } from '../../../mocks/currentGames';

storiesOf('Welcome', module)
  .add('regular state', () => (
    <Welcome startGame={action('Start Game')} currentGames={CURRENT_GAMES} />
  ));
