import React from 'react';

const Main = (props) => (
  <div>
    {React.cloneElement(props.children, props)}
  </div>
);

Main.propTypes = {
  children: React.PropTypes.any,
};

export default Main;
