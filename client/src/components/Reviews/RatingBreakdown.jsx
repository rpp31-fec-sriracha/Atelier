import React from 'react';

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      starsSelected: [],
      fiveStarCount: this.props.metadata.ratings[5],
      fourStarCount: this.props.metadata.ratings[4],
      threeStarCount: this.props.metadata.ratings[3],
      twoStarCount: this.props.metadata.ratings[2],
      oneStarCount: this.props.metadata.ratings[1],
      totalReviews: parseInt(this.props.metadata.recommended.false) + parseInt(this.props.metadata.recommended.true),
    };

    this.calculateAverage();
  }

  calculateAverage() {
    let fiveCount = (parseInt(this.state.fiveStarCount) * 5) || 0;
    let fourCount = (parseInt(this.state.fourStarCount) * 4) || 0;
    let threeCount = (parseInt(this.state.threeStarCount) * 3) || 0;
    let twoCount = (parseInt(this.state.twoStarCount) * 2) || 0;
    let oneCount = (parseInt(this.state.oneStarCount) * 1) || 0;

    let sum = fiveCount + fourCount + threeCount + twoCount + oneCount;
    let average = sum / this.state.totalReviews;
    let roundedAverage = Math.round(average * 10) / 10;

    this.props.setAverageReview(roundedAverage);
  }

  render() {
    if (this.props.metadata.length === 0) {
      return <div/>;
    }

    return (<div className="ratingBreakdown">
      <div>{this.props.averageStars} Stars</div>
      <div>{Math.round(this.props.metadata.recommended.true / this.state.totalReviews * 1000) / 10}% of reviews recommend this product</div>
      <div><u>5 stars</u> <progress value={this.state.fiveStarCount / this.state.totalReviews * 100 || 0} max="100"></progress></div>
      <div><u>4 stars</u> <progress value={this.state.fourStarCount / this.state.totalReviews * 100 || 0} max="100"></progress></div>
      <div><u>3 stars</u> <progress value={this.state.threeStarCount / this.state.totalReviews * 100 || 0} max="100"></progress></div>
      <div><u>2 stars</u> <progress value={this.state.twoStarCount / this.state.totalReviews * 100 || 0} max="100"></progress></div>
      <div><u>1 stars</u> <progress value={this.state.oneStarCount / this.state.totalReviews * 100 || 0} max="100"></progress></div>
    </div>);
  }
}

export default RatingBreakdown;