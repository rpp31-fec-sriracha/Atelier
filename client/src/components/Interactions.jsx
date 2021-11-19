import React from 'react';
import axios from 'axios';

class Interactions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div onClick={(e) => {
      let element = e.target.outerHTML;
      let widget = this.props.widget;
      let time = new Date(e.timeStamp).toISOString();

      axios.post('/api/interactions', { element, widget, time })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));

      // console.log({ element, widget, time });
    }}>{this.props.children}</div>);
  }
}

export default Interactions;