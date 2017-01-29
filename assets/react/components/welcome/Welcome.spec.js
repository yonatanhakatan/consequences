import React from 'react';
import { shallow } from 'enzyme';

import Welcome from './Welcome';
import { CURRENT_GAMES } from '../../mocks/currentGames';

describe('Welcome', () => {
  it('shows the "Login with Facebook" button when the user is not authenticated', () => {
    const user = { authenticated: false };
    const element = shallow(<Welcome user={user} />);
    expect(element.find('button.fbLogin').length).toEqual(1);
  });
  it('shows the correct number of games that the authenticated user is involved in', () => {
    const user = { authenticated: true };
    const element = shallow(<Welcome currentGames={CURRENT_GAMES} user={user} />);
    expect(element.find('.currentGames tbody tr').length).toEqual(CURRENT_GAMES.length);
  });
});
