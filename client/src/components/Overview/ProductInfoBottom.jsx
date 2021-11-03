import React from 'react';

const ProductInfoBottom = function(props) {
  let featureList;

  if (props.features) {
    featureList = props.features.map((f, index) => {
      return (<li key={index}>{f.value}</li>);
    });
  } else {
    featureList = (<div></div>);
  }
  return (
    <div id="productInfoBottom">
      <div>
        <h3>{props.slogan}</h3>
        <h4>{props.description}</h4>
      </div>
      <ul>
        {featureList}
      </ul>
    </div>
  );
};

export default ProductInfoBottom;