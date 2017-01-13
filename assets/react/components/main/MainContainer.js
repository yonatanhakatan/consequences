import React from 'react';

import Main from './Main';

import { initFB } from '../../utils/fb';

class MainContainer extends React.Component {

  componentDidMount() {
    initFB();
    this.props.verifyAuth(() => {
      this.props.getUserDetails(this.props.retrieveGames);
    });
  }

  render() {
    return <Main {...this.props} />;
  }
}

MainContainer.propTypes = {
  verifyAuth: React.PropTypes.func,
  getUserDetails: React.PropTypes.func,
  retrieveGames: React.PropTypes.func,
};

export default MainContainer;
