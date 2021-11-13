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
      averageReview: 0
    };

    if (this.state.averageReview === 0) {
      this.calculateAverage();
    }
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

    this.state.averageReview = roundedAverage;
    this.props.setAverageReview(roundedAverage);
  }

  render() {
    if (this.props.metadata.length === 0) {
      return <div/>;
    }

    return (<div className="ratingBreakdown">
      <div>{this.state.averageReview} Stars</div>
      <div>{this.props.metadata.recommended.true / this.state.totalReviews * 100}% of reviews recommend this product</div>
      <div>5 stars: {this.state.fiveStarCount / this.state.totalReviews * 100 || 0}%</div>
      <div>4 stars: {this.state.fourStarCount / this.state.totalReviews * 100 || 0}%</div>
      <div>3 stars: {this.state.threeStarCount / this.state.totalReviews * 100 || 0}%</div>
      <div>2 stars: {this.state.twoStarCount / this.state.totalReviews * 100 || 0}%</div>
      <div>1 stars: {this.state.oneStarCount / this.state.totalReviews * 100 || 0}%</div>
    </div>);
  }
}

export default RatingBreakdown;