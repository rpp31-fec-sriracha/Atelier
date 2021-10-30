import React from 'react';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import ReviewsList from './ReviewsList.jsx';


class Reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productReviews: {
        reviews: {},
        meta: {},
      }
    };
  }

  render() {
    return (<div className="reviewsContainer">
      <div>'Reviews Container'</div>
      <div><RatingBreakdown/></div>
      <div><ProductBreakdown/></div>
      <div><ReviewsList/></div>
    </div>);
  }
}

// const Reviews = function(props) {
//   return (<div className="reviews">
//     'Reviews';
//   </div>);
// };

export default Reviews;