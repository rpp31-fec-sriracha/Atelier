import React from 'react';
import ImageGallery from './ImageGallery.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';

const ProductInfo = function(props) {
  const showStars = (averageStars) => {
    let currentStars = averageStars;
    let starTypes = [];

    for (var i = 0; i < 5; i++) {
      if (currentStars >= .875) {
        starTypes[i] = 'fa fa-star';
      } else if (currentStars >= .625) {
        starTypes[i] = 'fa fa-star three-quarters-star';
      } else if (currentStars >= .375) {
        starTypes[i] = 'fa fa-star half-star';
      } else if (currentStars >= .125) {
        starTypes[i] = 'fa fa-star quarter-star';
      } else {
        starTypes[i] = 'fa fa-star-o';
      }
      currentStars--;
    }

    return starTypes.map((currentStar, i) => {
      return <div key={i} className={currentStar}></div>;
    });
  };

  let prices;

  if (props.currentStyle.sale_price) {
    prices = (<><s style={{color: 'red'}}>${props.currentStyle.original_price}</s>${props.currentStyle.sale_price}</>);
  } else {
    prices = '$' + props.currentStyle.original_price;
  }

  return (
    <div className="flex-row" id="productInfo">

      {Object.keys(props.currentStyle).length > 0 ?
        <ImageGallery thumbClick={props.thumbClick}
          currentStyle={props.currentStyle}
          styles={props.styles}
          selectedThumb={props.selectedThumb}
          handleArrowDown={props.handleArrowDown}
          handleArrowUp={props.handleArrowUp}
          thumbStart={props.thumbStart}
          thumbEnd={props.thumbEnd} /> :
        'Image Gallery'}

      <div className="flex-column" id="productInfoTop">
        <h4>{showStars(props.averageReview)} <a href="#ratings-reviews">Read all {props.numReviews} reviews</a></h4>
        <h4 data-testid="productCategory">{props.product.category}</h4>
        <h3 data-testid="productName">{props.product.name}</h3>

        <p>{prices}</p>

        {props.styles !== undefined ? <StyleSelector styleClick={props.styleClick} styles={props.styles} currentStyle={props.currentStyle} /> :
          <div></div>}
        <AddToCart handleAddToCart={props.handleAddToCart} currentStyle={props.currentStyle} />
      </div>

    </div>
  );
};

export default ProductInfo;