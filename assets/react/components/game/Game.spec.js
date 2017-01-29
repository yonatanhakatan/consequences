import React from 'react';
import { shallow, mount } from 'enzyme';

import Game from './Game';
import { INITIAL_CATEGORIES, FINAL_CATEGORIES } from '../../mocks/categories';

describe('Game', () => {
  it('When it\'s not the user\'s turn, a relevant message should be shown', () => {
    const element = shallow(<Game gameState="notUserTurn" />);
    expect(
      element
        .find('.game > div')
        .first()
        .text()
    ).toEqual('It\'s not currently your turn!');
  });

  it('When the user\'s turn has just ended, show an appropriate message', () => {
    const element = shallow(<Game gameState="turnEnded" />);
    expect(
      element
        .find('.game > div')
        .first()
        .text()
    ).toEqual('It\'s now your opponent\'s turn.');
  });

  it('When it\'s the user\'s turn, show the correct category label and allow them to submit', () => {
    const onEntrySubmit = { callback: () => {} };
    spyOn(onEntrySubmit, 'callback').and.callThrough();

    const element = mount(
      <Game
        gameState="userTurn"
        categories={INITIAL_CATEGORIES}
        onEntrySubmit={onEntrySubmit.callback}
      />
    );
    expect(
      element
        .find('.category label')
        .first()
        .text()
    ).toEqual(INITIAL_CATEGORIES[0].label);

    const sampleInputText = 'David';
    const input = element.find('.category > input').first();
    input.node.value = sampleInputText;
    element.find('.category > button').first().simulate('click');
    expect(onEntrySubmit.callback).toHaveBeenCalledWith(sampleInputText);
  });

  it('When the game has finished, reveal the whole story with the correct labels and values', () => {
    const element = shallow(<Game gameState="finished" categories={FINAL_CATEGORIES} />);

    for (let i = 0; i < FINAL_CATEGORIES.length; i++) {
      const tmpCategory = FINAL_CATEGORIES[i];

      if (tmpCategory.finalLabel) {
        expect(
          element
            .find('.category')
            .at(i)
            .find('.label')
            .first()
            .text()
        ).toEqual(tmpCategory.finalLabel);
      }

      expect(
        element
          .find('.category')
          .at(i)
          .find('.category > div')
          .at((i === 0) ? 0 : 1)
          .text()
      ).toEqual(tmpCategory.value);
    }
  });
});
