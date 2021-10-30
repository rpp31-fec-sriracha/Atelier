import React from 'react';
import IndividualReviewTile from './IndividualReviewTile.jsx';
import NewReview from './NewReview.jsx';
import KeywordSearch from './keywordSearch.jsx';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numReviewsVisible: 2
    };
  }

  render() {
    return (<div className="reviewsList">
      <div>'Reviews List Component'</div>
      <div>'Sort options - make its own component?</div>
      <div><IndividualReviewTile/></div>
      <div><NewReview/></div>
      <div><KeywordSearch/></div>

    </div>);
  }
}

export default ReviewsList;