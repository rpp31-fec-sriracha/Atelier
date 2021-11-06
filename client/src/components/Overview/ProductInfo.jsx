import React from 'react';
import ImageGallery from './ImageGallery.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';

const ProductInfo = function(props) {
  return (
    <div className="flex-row" id="productInfo">
      {/* <h1>Image Gallery</h1> */}
      <ImageGallery styles={props.styles} />
      {/* {this.props.styles ? <ImageGallery styles={this.props.styles.results} /> : 'Image Gallery'} */}
      <div className="flex-column" id="productInfoTop">
        <h4>STARS Read all # reviews</h4>
        <h4 data-testid="productCategory">{props.product.category}</h4>
        <h3 data-testid="productName">{props.product.name}</h3>

        <p>{props.product.default_price}</p>

        {props.styles !== undefined ? <StyleSelector styleClick={props.styleClick} styles={props.styles} /> :
          <div></div>}
        <AddToCart />
        <p>{props.product.description}</p>
      </div>

    </div>
  );
};

export default ProductInfo;