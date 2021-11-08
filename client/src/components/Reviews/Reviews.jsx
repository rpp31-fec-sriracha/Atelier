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
    return axios.get('/reviews', {
      params: {
        productId: this.state.currentProduct,
        sortType: this.state.sortType
      }
    });
  }

  getMetadata() {
    return axios.get('/reviews/meta', {
      params: {
        productId: this.state.currentProduct
      }
    });
  }

  componentDidMount() {
    Promise.all([this.getReviews(), this.getMetadata()])
      .then((response) => {
        this.setState({
          reviews: response[0].data.results,
          meta: response[1].data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateSortType(event) {
    this.setState({
      sortType: event
    }, () => {
      this.getReviews()
        .then((response) => {
          this.setState({
            reviews: response.data.results
          });
        })
        .catch((err) => console.log(err));
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