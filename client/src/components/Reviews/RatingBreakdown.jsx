import React from 'react';

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      starsSelected: []
      //or a state for 1,2,3,4, and 5?
    };
  }

  render() {
    return (<div className="ratingBreakdown">
      <div>'Ratings Breakdown'</div>
    </div>);
  }
}

export default RatingBreakdown;