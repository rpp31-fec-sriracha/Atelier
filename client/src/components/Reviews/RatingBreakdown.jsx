import React from 'react';

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      starsSelected: [],
      //or a state for 1,2,3,4, and 5?
      fiveStarCount: this.props.metadata.ratings[5],
      fourStarCount: this.props.metadata.ratings[4],
      threeStarCount: this.props.metadata.ratings[3],
      twoStarCount: this.props.metadata.ratings[2],
      oneStarCount: this.props.metadata.ratings[1],
      totalReviews: this.props.metadata.recommended.false + this.props.metadata.recommended.true

    };
  }

  render() {

    if (this.props.metadata.length === 0) {
      return <div/>;
    }

    return (<div className="ratingBreakdown">
      <div>'Ratings Breakdown'</div>
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