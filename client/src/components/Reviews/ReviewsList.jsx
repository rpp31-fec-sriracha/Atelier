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

    this.onClose = this.onClose.bind(this);
  }

  moreReviews() {
    this.setState({
      numReviewsVisible: this.state.numReviewsVisible + 2
    });
  }

  onClose() {
    this.setState({newReviewOpen: false});
  }

  render() {
    if (this.props.reviews.length === 0) {
      return (
        <div>
          {/* <h2>There are currently no reviews. Click below to add your own!</h2> */}
          <button onClick={() => this.setState({ newReviewOpen: true })}>ADD A REVIEW +</button>
          <NewReview productName={this.props.productName} open={this.state.newReviewOpen}
            onClose={this.onClose} characteristics={this.props.characteristics} productID={this.props.productID}></NewReview>
        </div>
      );
    }

    return (<div className="reviewsList">
      <div id={'scrollable-reviews'}>
        {this.props.reviews.slice(0, this.state.numReviewsVisible).map((review, i) => {
          return <IndividualReviewTile key={i} currentReview={review} />;
        })}
      </div>
      <div className="flex-row">
        {(this.props.reviews.length > 2 && this.state.numReviewsVisible < this.props.reviews.length) ? <button onClick={() => this.moreReviews()}>MORE REVIEWS</button> : null}
        <div>
          <button onClick={() => this.setState({newReviewOpen: true})}>ADD A REVIEW +</button>
          <NewReview productName={this.props.productName} open={this.state.newReviewOpen}
            onClose={this.onClose} characteristics={this.props.characteristics} productID={this.props.productID}></NewReview>
        </div>
      </div>
      {/* <div><KeywordSearch/></div> */}
    </div>);
  }
}

export default ReviewsList;