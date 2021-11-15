import React from 'react';
import Slider from './Slider.jsx';

//use _.map to address all categories

const ProductBreakdown = function(props) {
  if (props.metadata.length === 0) {
    return <div/>;
  }

  return (<div className="productBreakdown">
    {props.metadata.characteristics.Size ? <Slider name={'Size'} charValue={props.metadata.characteristics.Size.value}/> : null}
    {props.metadata.characteristics.Width ? <Slider name={'Width'} charValue={props.metadata.characteristics.Width.value}/> : null}
    {props.metadata.characteristics.Comfort ? <Slider name={'Comfort'} charValue={props.metadata.characteristics.Comfort.value}/> : null}
    {props.metadata.characteristics.Quality ? <Slider name={'Quality'} charValue={props.metadata.characteristics.Quality.value}/> : null}
    {props.metadata.characteristics.Length ? <Slider name={'Length'} charValue={props.metadata.characteristics.Length.value}/> : null}
    {props.metadata.characteristics.Fit.value ? <Slider name={'Fit'} charValue={props.metadata.characteristics.Fit.value}/> : null}
  </div>);
};

export default ProductBreakdown;