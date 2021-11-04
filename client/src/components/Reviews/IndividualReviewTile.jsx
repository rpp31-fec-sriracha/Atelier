import React from 'react';

class IndividualReviewTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterSelected: 'relevance'
    };
  }

  render() {
    return (<div className="individualReviewTile">
      <div class="flex-row">
        <div>{this.props.currentReview.rating} Stars</div>
        <div>{this.props.currentReview.reviewer_name}, </div>
        <div>{this.props.currentReview.date}</div>
      </div>
      <h4>{this.props.currentReview.summary}</h4>
      <div>{this.props.currentReview.body}</div>
      <div>{this.props.currentReview.response}</div>
      <div>Helpful? Yes ({this.props.currentReview.helpfulness}) | Report</div>
      <div>Photos</div>
    </div>);
  }
}

export default IndividualReviewTile;