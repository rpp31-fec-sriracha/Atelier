import React from 'react';

class Interactions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div onClick={(e) => console.log(e.target)}>{this.props.children}</div>);
  }
}

export default Interactions;