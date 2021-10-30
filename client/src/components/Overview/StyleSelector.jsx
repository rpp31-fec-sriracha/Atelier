import React from 'react';

const StyleSelector = function(props) {
  return (
    <React.Fragment>
      <div className="flex-row">
        <h3>{'Style >'} </h3><h4>Selected Style</h4>
      </div>
      <div className="flex-row styleThumbs">
        <div className="styleThumb" ></div>
        <div className="styleThumb" ></div>
        <div className="styleThumb" ></div>
        <div className="styleThumb" ></div>
        <div className="styleThumb" ></div>
        <div className="styleThumb" ></div>
        <div className="styleThumb" ></div>
        <div className="styleThumb" ></div>
      </div>
    </React.Fragment>
  );
};

export default StyleSelector;