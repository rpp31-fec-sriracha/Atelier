import React from 'react';

class IndividualReviewTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterSelected: 'relevance'
    };
  }

  render() {
    console.log(this.props);
    const options = {year: 'numeric', month: 'long', day: 'numeric'};

    return (<div className="individual-review-tile">
      <div className="flex-row-reviews">
        <div>{this.props.currentReview.rating} Stars</div>
        <div>
          <div>{this.props.currentReview.reviewer_name}, </div>
          <div>{new Intl.DateTimeFormat('en-US', options).format(Date.parse(this.props.currentReview.date))}</div>
        </div>
      </div>
      <h4>{this.props.currentReview.summary}</h4>
      <div>{this.props.currentReview.body}</div>
      <div>{this.props.currentReview.response}</div>
      <div data-testid="helpful-count">Helpful? Yes ({this.props.currentReview.helpfulness}) | Report</div>
      <div>Photos</div>
    </div>);
  }
}

export default IndividualReviewTile;