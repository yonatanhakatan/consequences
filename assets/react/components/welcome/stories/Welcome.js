import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import Welcome from '../Welcome';
import { CURRENT_GAMES } from '../../../mocks/currentGames';

storiesOf('Welcome', module)
  .add('non authenticated state', () => {
    const user = {
      authenticated: false,
    };

    return (
      <Welcome
        user={user}
        attemptFbAuth={action('Attempt FB Game')}
        startGame={action('Start Game')}
        currentGames={CURRENT_GAMES}
      />
    );
  })
  .add('authenticated state', () => {
    const user = {
      authenticated: true,
    };

    return (
      <Welcome
        user={user}
        attemptFbAuth={action('Attempt FB Game')}
        startGame={action('Start Game')}
        currentGames={CURRENT_GAMES}
      />
    );
  });
