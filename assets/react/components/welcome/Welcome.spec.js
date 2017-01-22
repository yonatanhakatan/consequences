import React from 'react';
import { shallow } from 'enzyme';

import Welcome from './Welcome';
import { CURRENT_GAMES } from '../../mocks/currentGames';

describe('Welcome', () => {
  it('shows the correct number of games that the user is involved in', () => {
    const element = shallow(<Welcome currentGames={CURRENT_GAMES} />);
    expect(element.find('.currentGames tbody tr').length).toEqual(CURRENT_GAMES.length);
  });
});
