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

    };
  }

  render() {
    return (<div className="ratingBreakdown">
      <div>'Ratings Breakdown'</div>
      <div>{this.props.metadata.recommended.true / 3 * 100}% of reviews recommend this product</div>
      <div>5 stars: {this.state.fiveStarCount / 3 * 100 || 0}%</div>
      <div>4 stars: {this.state.fourStarCount / 3 * 100 || 0}%</div>
      <div>3 stars: {this.state.threeStarCount / 3 * 100 || 0}%</div>
      <div>2 stars: {this.state.twoStarCount / 3 * 100 || 0}%</div>
      <div>1 stars: {this.state.oneStarCount / 3 * 100 || 0}%</div>
    </div>);
  }
}

export default RatingBreakdown;