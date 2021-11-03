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
        <h2>{props.slogan}</h2>
        <h3>{props.description}</h3>
      </div>
      <ul>
        {featureList}
      </ul>
    </div>
  );
};

export default ProductInfoBottom;