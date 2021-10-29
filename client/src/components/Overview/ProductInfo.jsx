import React from 'react';
import ImageGallery from './ImageGallery.jsx';

const ProductInfo = function(props) {
  return (
    <div className="flex-row" id="productInfo">
      {/* <h1>Image Gallery</h1> */}
      <ImageGallery styles={props.styles} />
      {/* {this.props.styles ? <ImageGallery styles={this.props.styles.results} /> : 'Image Gallery'} */}
      <div id="productInfoTop">
        <h4>STARS Read all # reviews</h4>
        <h4>{props.product.category}</h4>
        <h3>{props.product.name}</h3>

        <p>{props.product.default_price}</p>

        <h2>Style Selector</h2>
        <h2>Add to Cart</h2>
        <p>{props.product.description}</p>
      </div>

    </div>
  );
};

export default ProductInfo;