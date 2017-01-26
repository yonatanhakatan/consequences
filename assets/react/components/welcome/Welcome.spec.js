import React from 'react';
import { shallow } from 'enzyme';

import Welcome from './Welcome';
import { CURRENT_GAMES } from '../../mocks/currentGames';

describe('Welcome', () => {
  it('shows the correct number of games that the authenticated user is involved in', () => {
    const user = { authenticated: true };
    const element = shallow(<Welcome currentGames={CURRENT_GAMES} user={user} />);
    expect(element.find('.currentGames tbody tr').length).toEqual(CURRENT_GAMES.length);
  });
});
