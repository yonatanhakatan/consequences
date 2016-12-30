import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../redux/actions';

import MainContainer from '../main/MainContainer';

function mapStateToProps(state) {
  return {
    user: state.user,
    games: state.games,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(MainContainer);

export default App;
