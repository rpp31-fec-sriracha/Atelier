import React from 'react';

class IndividualReviewTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterSelected: 'relevance'
    };
  }

  showStars(averageStars) {
    let currentStars = averageStars;
    let starTypes = [];

    for (var i = 0; i < 5; i++) {
      if (currentStars >= 1) {
        starTypes[i] = 'fa fa-star';
      } else {
        starTypes[i] = 'fa fa-star-o';
      }
      currentStars--;
    }

    return starTypes.map((currentStar, i) => {
      return <div key={i} className={currentStar}></div>;
    });
  }

  render() {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};

    return (<div className="individual-review-tile">
      <div className="flex-row-reviews">
        <div>{this.showStars(this.props.currentReview.rating)}</div>
        <div>
          <div>{this.props.currentReview.reviewer_name}, </div>
          <div>{new Intl.DateTimeFormat('en-US', options).format(Date.parse(this.props.currentReview.date))}</div>
        </div>
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