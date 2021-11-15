import React from 'react';

const Slider = function(props) {


  return (<div className="slider">
    <div>{props.name}</div>
    <div className="slidecontainer">
      <input type="range" min="1" max="5" defaultValue={props.charValue} className="slider" id="myRange" disabled></input>
    </div>
  </div>);
};

export default Slider;