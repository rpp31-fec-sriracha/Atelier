import React from 'react';
import IndividualReviewTile from './IndividualReviewTile.jsx';
import NewReview from './NewReview.jsx';
import KeywordSearch from './keywordSearch.jsx';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numReviewsVisible: 2,
      sortOption: 'relevance',
      newReviewOpen: false
    };
  }

  moreReviews() {
    this.setState({
      numReviewsVisible: this.state.numReviewsVisible + 2
    });
  }

  render() {
    if (this.props.reviews.length === 0) {
      return <div></div>;
    }

    return (<div className="reviewsList">
      <div>'Reviews List Component'</div>
      {this.props.reviews.slice(0, this.state.numReviewsVisible).map((review) => {
        return <IndividualReviewTile currentReview={review} />;
      })}
      <div className="flex-row">
        <button onClick={() => this.moreReviews()}>MORE REVIEWS</button>
        <div>
          <button onClick={() => this.setState({newReviewOpen: true})}>ADD A REVIEW +</button>
          <NewReview open={this.state.newReviewOpen} onClose={() => this.setState({newReviewOpen: false})}></NewReview>
        </div>
      </div>
      <div><KeywordSearch/></div>
    </div>);
  }
}

export default ReviewsList;