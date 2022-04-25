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
      //future refactor - remove the reviewsFilter object and switch statement below
      reviewsFilter: {
        fiveStar: false,
        fourStar: false,
        threeStar: false,
        twoStar: false,
        oneStar: false
      },
      filtering: false,
      // currentFilters: [],
      filterMessage: ''
    };

    this.calculateAverage();
    this.calculateFilters = this.calculateFilters.bind(this);
    this.removeFilters = this.removeFilters.bind(this);
  }

  componentDidMount() {
    let starCounter = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0
    };

    for (var review of this.props.reviews) {
      starCounter[review.rating]++;
    }

    this.setState({
      fiveStarCount: starCounter[5],
      fourStarCount: starCounter[4],
      threeStarCount: starCounter[3],
      twoStarCount: starCounter[2],
      oneStarCount: starCounter[1],
    });
  }

  calculateAverage() {
    let starCounter = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0
    };

    for (var review of this.props.reviews) {
      starCounter[review.rating]++;
    }

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

  calculateFilters(e) {
    let newFilterState = this.state.reviewsFilter;
    newFilterState[e] = !newFilterState[e];

    this.setState({
      reviewsFilter: newFilterState
    });

    let currentSelection = null;

    switch (e) {
    case ('fiveStar'):
      currentSelection = 5;
      break;
    case ('fourStar'):
      currentSelection = 4;
      break;
    case ('threeStar'):
      currentSelection = 3;
      break;
    case ('twoStar'):
      currentSelection = 2;
      break;
    case ('oneStar'):
      currentSelection = 1;
      break;
    }

    let newFilters = this.props.currentFilters;
    if (newFilterState[e] === true) {
      this.setState({
        filtering: true
      });
      newFilters.push(currentSelection);
      newFilters.sort();
    }

    if (newFilterState[e] === false) {
      let index = newFilters.indexOf(currentSelection);
      newFilters.splice(index, 1);
    }

    let newMessage = 'Filters selected: ';
    for (var i of newFilters) {
      newMessage = newMessage + i + ', ';
    }
    newMessage = newMessage.slice(0, newMessage.length - 2);
    this.setState({
      filterMessage: newMessage
    });

    this.props.setCurrentFilters(newFilters);

    if (newFilters.length === 0) {
      this.setState({
        filtering: false
      });
    }

    this.props.updateFilteredReviews(this.props.currentFilters);
  }

  removeFilters() {
    this.setState({
      reviewsFilter: {
        fiveStar: false,
        fourStar: false,
        threeStar: false,
        twoStar: false,
        oneStar: false
      },
      filtering: false
    });

    this.props.setCurrentFilters([]);

    this.props.updateFilteredReviews([]);
  }

  showStars(averageStars) {
    let currentStars = averageStars;
    let starTypes = [];

    for (var i = 0; i < 5; i++) {
      if (currentStars >= .875) {
        starTypes[i] = 'fa fa-star';
      } else if (currentStars >= .625) {
        starTypes[i] = 'fa fa-star three-quarters-star';
      } else if (currentStars >= .375) {
        starTypes[i] = 'fa fa-star half-star';
      } else if (currentStars >= .125) {
        starTypes[i] = 'fa fa-star quarter-star';
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
    if (this.props.metadata.length === 0) {
      return <div/>;
    }

    return (<div className="rating-breakdown">
      <h1>{this.props.averageStars}</h1>
      <div>{this.showStars(this.props.averageStars)}</div>
      {this.state.filtering ? <div>{this.state.filterMessage}</div> : null}
      {this.state.filtering ? <div onClick={() => this.removeFilters()}><u>Remove all filters</u></div> : null}
      <div>{Math.round(this.props.metadata.recommended.true / this.state.totalReviews * 1000) / 10}% of reviews recommend this product</div>
      <div onClick={() => this.calculateFilters('fiveStar')}><u>5 stars</u> <progress value={this.state.fiveStarCount / this.state.totalReviews * 100 || 0} max="100"></progress><span>({this.state.fiveStarCount})</span></div>
      <div onClick={() => this.calculateFilters('fourStar')}><u>4 stars</u> <progress value={this.state.fourStarCount / this.state.totalReviews * 100 || 0} max="100"></progress><span>({this.state.fourStarCount})</span></div>
      <div onClick={() => this.calculateFilters('threeStar')}><u>3 stars</u> <progress value={this.state.threeStarCount / this.state.totalReviews * 100 || 0} max="100"></progress><span>({this.state.threeStarCount})</span></div>
      <div onClick={() => this.calculateFilters('twoStar')}><u>2 stars</u> <progress value={this.state.twoStarCount / this.state.totalReviews * 100 || 0} max="100"></progress><span>({this.state.twoStarCount})</span></div>
      <div onClick={() => this.calculateFilters('oneStar')}><u>1 stars</u> <progress value={this.state.oneStarCount / this.state.totalReviews * 100 || 0} max="100"></progress><span>({this.state.oneStarCount})</span></div>
    </div>);
  }
}

export default RatingBreakdown;