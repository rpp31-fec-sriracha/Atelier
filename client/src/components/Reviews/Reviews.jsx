import React from 'react';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import ReviewsList from './ReviewsList.jsx';
import SortSelector from './SortSelector.jsx';
const axios = require('axios');


class Reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProduct: 59556,
      reviews: [],
      meta: {},
      sortType: 'relevant'
    };

    this.updateSortType = this.updateSortType.bind(this);
  }

  getReviews() {
    axios.get('/reviews', {
      params: {
        productId: this.state.currentProduct,
        sortType: this.state.sortType
      }
    })
      .then((response) => {
        this.setState({
          reviews: response.data.results
        });
      })
      .catch((err) => console.log(err));
  }

  getMetadata() {
    axios.get('/reviews/meta', {
      params: {
        productId: this.state.currentProduct
      }
    })
      .then((response) => {
        this.setState({
          meta: response.data
        });
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.getReviews();
    this.getMetadata();
  }

  updateSortType(event) {
    this.setState({
      sortType: event
    });
  }

  render() {
    if (Object.keys(this.state.meta).length === 0 || Object.keys(this.state.meta.ratings).length === 0) {
      return (
        <div><ReviewsList reviews={this.state.reviews}/></div>
      );
    }

    return (<div className="reviewsContainer">
      <div>'RATINGS & REVIEWS'</div>
      <div className="flex-row-reviews">
        <div className="flex-column">
          <div><RatingBreakdown metadata={this.state.meta}/></div>
          <div><ProductBreakdown metadata={this.state.meta}/></div>
        </div>
        <div className="flex-column">
          <div> {this.state.reviews.length} reviews, sorted by <SortSelector updateSortType = {this.updateSortType}/></div>
          <div className="flex-column"><ReviewsList reviews={this.state.reviews}/></div>
        </div>
      </div>
    </div>);
  }
}

export default Reviews;