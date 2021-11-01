import React from 'react';

//use _.map

const ProductBreakdown = function(props) {
  if (props.metadata.length === 0) {
    return <div/>;
  }

  return (<div className="productBreakdown">
    <div>'ProductBreakdown for product# {props.metadata.product_id}</div>
    <div>Fit: {props.metadata.characteristics.Fit.value}</div>
    <div>Length: {props.metadata.characteristics.Length.value}</div>
    <div>Comfort: {props.metadata.characteristics.Comfort.value}</div>
    <div>Quality: {props.metadata.characteristics.Quality.value}</div>
  </div>);
};

export default ProductBreakdown;