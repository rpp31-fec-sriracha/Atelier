import React from 'react';


class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.renderSwitch = this.renderSwitch.bind(this);
  }

  renderSwitch(characteristic) {
    switch (characteristic) {
    case ('Size'):
      return (
        <div className="flex-row-reviews-min-max">
          <div>A size too small</div>
          <div>A size too large</div>
        </div>
      );
    case ('Width'):
      return (
        <div className="flex-row-reviews-min-max">
          <div>Too Narrow</div>
          <div>Too Wide</div>
        </div>
      );
    case ('Comfort'):
      return (
        <div className="flex-row-reviews-min-max">
          <div>Uncomfortable</div>
          <div>Perfect</div>
        </div>
      );
    case ('Quality'):
      return (
        <div className="flex-row-reviews-min-max">
          <div>Poor</div>
          <div>Perfect</div>
        </div>
      );
    case ('Length'):
      return (
        <div className="flex-row-reviews-min-max">
          <div>Runs short</div>
          <div>Runs long</div>
        </div>
      );
    case ('Fit'):
      return (
        <div className="flex-row-reviews-min-max">
          <div>Runs tight</div>
          <div>Runs long</div>
        </div>
      );
    }
  }

  render() {
    return (<div className="slider">
      <div>{this.props.name}</div>
      <div className="slidecontainer">
        <input type="range" min="1" max="5" defaultValue={this.props.charValue} className="slider" id="myRange" disabled></input>
      </div>
      {this.renderSwitch(this.props.name)}
    </div>);
  }
}
export default Slider;