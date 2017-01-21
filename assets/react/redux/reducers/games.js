import update from 'immutability-helper';

export default function games(state = {}, action) {
  switch (action.type) {
    case 'CREATE_GAME': {
      return update(state, { [action.gameId]: { $set: {
        hostFbUser: action.gameData.hostFbUser || null,
        opponentFbUser: action.gameData.opponentFbUser || null,
        turn: action.gameData.turn || null,
        manName: action.gameData.manName || null,
        womanName: action.gameData.womanName || null,
        location: action.gameData.location || null,
        manSaid: action.gameData.manSaid || null,
        womanSaid: action.gameData.womanSaid || null,
        andThen: action.gameData.andThen || null,
      } } });
    }
    case 'UPDATE_GAME_VALUE': {
      return update(state, {
        [action.gameId]: {
          [action.gameKey]: {
            $set: action.gameVal,
          },
          turn: {
            $set: action.gameNextTurn,
          },
        },
      });
    }
    default:
      return state;
  }
}
