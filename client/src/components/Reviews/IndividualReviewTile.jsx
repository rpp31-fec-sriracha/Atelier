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
      <div>'Individual Review Tile'</div>
      <div>{this.props.currentReview.rating}</div>
      <div>{this.props.currentReview.summary}</div>
      <div>{this.props.currentReview.reviewer_name}</div>
      <div>{this.props.currentReview.date}</div>
      <div>{this.props.currentReview.body}</div>
      <div>{this.props.currentReview.response}</div>
      <div>Helpful? Yes ({this.props.currentReview.helpfulness}) | Report</div>
      <div>Photos</div>
    </div>);
  }
}

export default IndividualReviewTile;