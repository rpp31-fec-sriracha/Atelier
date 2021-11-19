import React from 'react';
import axios from 'axios';

class Interactions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div onClick={(e) => {
      let element = e.target;
      let widget = this.props.widget;
      let time = e.timeStamp;

      console.log('element', element, 'widget', widget, 'time', time);
    }}>{this.props.children}</div>);
  }
}

export default Interactions;