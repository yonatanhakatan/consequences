import update from 'immutability-helper';

export default function test(state = {}, action) {
  switch (action.type) {
    case 'TEST':
      return update(state, {
        currentValue: { $set: action.val },
      });
    default:
      return state;
  }
}
