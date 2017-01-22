import React from 'react';
import { shallow } from 'enzyme';

import Welcome from './Welcome';
import { USER_TURN_GAMES } from '../../mocks/userTurnGames';

describe('Welcome', () => {
  it('shows the correct number of games that it\'s the user\'s turn in', () => {
    const element = shallow(<Welcome usersTurnGames={USER_TURN_GAMES} />);
    expect(element.find('.usersTurn li').length).toEqual(USER_TURN_GAMES.length);
  });
});
