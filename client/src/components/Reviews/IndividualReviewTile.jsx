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
    </div>);
  }
}

export default IndividualReviewTile;