import update from 'immutability-helper';

export default function games(state = {}, action) {
  switch (action.type) {
    case 'CREATE_GAME': {
      return update(state, { [action.gameId]: { $set: {
        hostFbId: action.gameData.hostFbId || null,
        opponentFbId: action.gameData.opponentFbId || null,
        turn: action.gameData.turn || null,
        manName: action.gameData.manName || null,
        womanName: action.gameData.womanName || null,
        location: action.gameData.location || null,
        manSaid: action.gameData.manSaid || null,
        womanSaid: action.gameData.womanSaid || null,
        andThen: action.gameData.andThen || null,
      } } });
    }
    default:
      return state;
  }
}
