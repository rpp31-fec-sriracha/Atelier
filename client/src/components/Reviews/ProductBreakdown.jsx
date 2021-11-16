import React from 'react';
import Slider from './Slider.jsx';

//use _.map to address all categories

const ProductBreakdown = function(props) {
  if (props.metadata.length === 0) {
    return <div/>;
  }

  return (<div className="productBreakdown">
    {props.metadata.characteristics.Size ? <div><Slider name={'Size'} charValue={props.metadata.characteristics.Size.value}></Slider></div> : null}
    {props.metadata.characteristics.Width ? <div> <Slider name={'Width'} charValue={props.metadata.characteristics.Width.value}></Slider></div> : null}
    {props.metadata.characteristics.Comfort ? <div><Slider name={'Comfort'} charValue={props.metadata.characteristics.Comfort.value}></Slider></div> : null}
    {props.metadata.characteristics.Quality ? <div><Slider name={'Quality'} charValue={props.metadata.characteristics.Quality.value}></Slider></div> : null}
    {props.metadata.characteristics.Length ? <div><Slider name={'Length'} charValue={props.metadata.characteristics.Length.value}></Slider></div> : null}
    {props.metadata.characteristics.Fit ? <div><Slider name={'Fit'} charValue={props.metadata.characteristics.Fit.value}></Slider></div> : null}
  </div>);
};

export default ProductBreakdown;