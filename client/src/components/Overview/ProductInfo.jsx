import React from 'react';
import ImageGallery from './ImageGallery.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';

{ /* <ProductInfo product={this.props.productInfo}
        styles={this.props.productStyles}
        styleClick={this.handleStyleClick}
        thumbClick={this.handleThumbClick}
        defaultStyle={this.state.defaultStyle}
        currentStyle={this.state.currentStyle}
        selectedThumb={this.state.selectedThumb} /> */ }

const ProductInfo = function(props) {
  console.log('current style ----->', props.currentStyle);
  return (
    <div className="flex-row" id="productInfo">
      {/* <h1>Image Gallery</h1> */}
      {/* <ImageGallery currentStyle={props.currentStyle} styles={props.styles} /> */}
      {Object.keys(props.currentStyle).length > 0 ?
        <ImageGallery thumbClick={props.thumbClick}
          currentStyle={props.currentStyle}
          styles={props.styles}
          selectedThumb={props.selectedThumb} /> :
        'Image Gallery'}

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