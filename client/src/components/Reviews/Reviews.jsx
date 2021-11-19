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
      currentProduct: this.props.currentProductId,
      reviews: [],
      meta: {},
      sortType: 'relevant',
      filteredReviews: [],
      currentFilters: []
    };

    this.updateSortType = this.updateSortType.bind(this);
    this.updateFilteredReviews = this.updateFilteredReviews.bind(this);
    this.setHelpfulness = this.setHelpfulness.bind(this);
    this.setCurrentFilters = this.setCurrentFilters.bind(this);
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
          filteredReviews: response[0].data.results,
          meta: response[1].data
        });
      })
      .then(() => {
        this.props.setNumReviews(this.state.reviews.length);
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
        .then(() => {
          this.updateFilteredReviews(this.state.currentFilters);
        })
        .catch((err) => console.log(err));
    });
  }

  setCurrentFilters(currentFilters) {
    this.setState({
      currentFilters: currentFilters
    });
  }

  updateFilteredReviews(currentFilters) {
    let newFilteredReviews = [];

    if (currentFilters.length > 0) {
      for (var review of this.state.reviews) {
        if (currentFilters.indexOf(review.rating) !== -1) {
          newFilteredReviews.push(review);
        }
      }
      this.setState({
        filteredReviews: newFilteredReviews
      });
    } else {
      this.setState({
        filteredReviews: this.state.reviews
      });
    }
  }

  setHelpfulness(index) {
    this.state.reviews[index].helpfulness = this.state.reviews[index].helpfulness + 1;
  }

  render() {
    if (Object.keys(this.state.meta).length === 0 || Object.keys(this.state.meta.ratings).length === 0) {
      return (
        <div><ReviewsList reviews={this.state.reviews}/></div>
      );
    }

    return (<div className="reviews-container">
      <div><font size="+2">RATINGS & REVIEWS</font></div>
      <div className="flex-row-reviews">
        <div className="flex-column">
          <div><RatingBreakdown metadata={this.state.meta} setAverageReview={this.props.setAverageReview}
            averageStars={this.props.averageStars} filteredReviews={this.state.filteredReviews}
            reviews={this.state.reviews} updateFilteredReviews={this.updateFilteredReviews}
            currentFilters={this.state.currentFilters} setCurrentFilters={this.setCurrentFilters}/></div>
          <div><ProductBreakdown metadata={this.state.meta}/></div>
        </div>
        <div className="flex-column individual-reviews">
          <div> {this.props.numReviews} reviews, sorted by <SortSelector updateSortType = {this.updateSortType}/></div>
          <div className="flex-column"><ReviewsList reviews={this.state.filteredReviews} productName={this.props.productName}
            characteristics={this.state.meta.characteristics} productID={this.state.currentProduct} setHelpfulness={this.setHelpfulness}/></div>
        </div>
      </div>
    </div>);
  }
}

export default Reviews;