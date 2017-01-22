import React from 'react';
import { shallow } from 'enzyme';

import Welcome from './Welcome';
import { CURRENT_GAMES } from '../../mocks/currentGames';

describe('Welcome', () => {
  it('shows the correct number of games that the user is involved in', () => {
    const element = shallow(<Welcome currentGames={CURRENT_GAMES} />);
    /*
      It should equal (CURRENT_GAMES.length + 1) because there will always
      be the first row with the header items
    */
    expect(element.find('.currentGames tr').length).toEqual(CURRENT_GAMES.length + 1);
  });
});
