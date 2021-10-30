import React from 'react';
import IndividualReviewTile from './IndividualReviewTile.jsx';
import NewReview from './NewReview.jsx';
import KeywordSearch from './keywordSearch.jsx';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numReviewsVisible: 2,
      sortOption: 'relevance'
    };
  }

  render() {
    return (<div className="reviewsList">
      <div>'Reviews List Component'</div>
      <div>'Sort options - make its own component?</div>
      <div>3 reviews, sorted by relevance</div>
      <div><IndividualReviewTile currentReview={this.props.reviews[0]}/></div>
      <div><IndividualReviewTile currentReview={this.props.reviews[1]}/></div>
      <div><NewReview/></div>
      <div><KeywordSearch/></div>

    </div>);
  }
}

export default ReviewsList;