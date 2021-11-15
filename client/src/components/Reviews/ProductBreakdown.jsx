import React from 'react';

//use _.map to address all categories

const ProductBreakdown = function(props) {
  if (props.metadata.length === 0) {
    return <div/>;
  }

  return (<div className="productBreakdown">
    {props.metadata.characteristics.Size ? <div>Size: {props.metadata.characteristics.Size.value}</div> : null}
    {props.metadata.characteristics.Width ? <div>Width: {props.metadata.characteristics.Width.value}</div> : null}
    {props.metadata.characteristics.Comfort ? <div>Comfort: {props.metadata.characteristics.Comfort.value}</div> : null}
    {props.metadata.characteristics.Quality ? <div>Quality: {props.metadata.characteristics.Quality.value}</div> : null}
    {props.metadata.characteristics.Length ? <div>Length: {props.metadata.characteristics.Length.value}</div> : null}
    {props.metadata.characteristics.Fit ? <div>Fit: {props.metadata.characteristics.Fit}</div> : null}
  </div>);
};

export default ProductBreakdown;