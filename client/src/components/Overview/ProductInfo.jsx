import React from 'react';
import ImageGallery from './ImageGallery.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';

const ProductInfo = function(props) {
  return (
    <div className="flex-row" id="productInfo">
      {/* <h1>Image Gallery</h1> */}
      {/* <ImageGallery currentStyle={props.currentStyle} styles={props.styles} /> */}
      {Object.keys(props.currentStyle).length > 0 ?
        <ImageGallery thumbClick={props.thumbClick}
          currentStyle={props.currentStyle}
          styles={props.styles}
          selectedThumb={props.selectedThumb}
          handleArrowDown={props.handleArrowDown}
          thumbStart={props.thumbStart}
          thumbEnd={props.thumbEnd} /> :
        'Image Gallery'}

      <div className="flex-column" id="productInfoTop">
        <h4>{props.averageReview} stars Read all # reviews</h4>
        <h4 data-testid="productCategory">{props.product.category}</h4>
        <h3 data-testid="productName">{props.product.name}</h3>

        <p>{props.product.default_price}</p>

        {props.styles !== undefined ? <StyleSelector styleClick={props.styleClick} styles={props.styles} currentStyle={props.currentStyle} /> :
          <div></div>}
        <AddToCart handleAddToCart={props.handleAddToCart} currentStyle={props.currentStyle} />
        <p>{props.product.description}</p>
      </div>

    </div>
  );
};

export default ProductInfo;