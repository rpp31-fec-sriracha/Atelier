import React from 'react';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import ReviewsList from './ReviewsList.jsx';
const axios = require('axios');


class Reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProduct: 59556,
      reviews: [],
      meta: {}
    };
  }

  getReviews() {
    axios.get('/reviews', {
      params: {
        productId: this.state.currentProduct
      }
    })
      .then((response) => {
        // console.log('success');
        // console.log(response.data.results);
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

  render() {
    if (Object.keys(this.state.meta).length === 0 || Object.keys(this.state.meta.ratings).length === 0) {
      return (
        <div><ReviewsList reviews={this.state.reviews}/></div>
      );
    }

    return (<div className="reviewsContainer">
      <div>'Reviews Container'</div>
      <div><RatingBreakdown metadata={this.state.meta}/></div>
      <div><ProductBreakdown metadata={this.state.meta}/></div>
      <div><ReviewsList reviews={this.state.reviews}/></div>
    </div>);
  }
}

export default Reviews;