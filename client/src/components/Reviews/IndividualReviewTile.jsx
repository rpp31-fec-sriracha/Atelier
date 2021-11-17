import React from 'react';

class IndividualReviewTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterSelected: 'relevance',
      showReviewLink: false,
      reviewToShow: this.props.currentReview.body
    };

    this.showFullReview = this.showFullReview.bind(this);
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

  componentDidMount() {
    if (this.props.currentReview.body.length <= 250) {
      this.setState({
        showReviewLink:false,
        reviewToShow: this.props.currentReview.body
      });
    } else {
      this.setState({
        showReviewLink: true,
        reviewToShow: this.props.currentReview.body.slice(0, 251)
      });
    }
  }

  showFullReview(e) {
    // console.log('click');
    this.setState({
      reviewToShow: this.props.currentReview.body,
      showReviewLink: false
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
      <h4>{this.props.currentReview.summary.slice(0, 60)}</h4>
      <div>{this.state.reviewToShow}</div>
      {this.state.showReviewLink ? <div onClick={() => this.showFullReview()}><u>Show more</u></div> : null}
      <div>{this.props.currentReview.response}</div>
      <div>Helpful? Yes ({this.props.currentReview.helpfulness}) | Report</div>
      <div>{console.log(this.props.currentReview.photos)}</div>
      <div className="photo-list">
        {this.props.currentReview.photos.map((photo, i) => <img className="photos" key={i} src={photo.url}></img>)}
      </div>
    </div>);
  }
}

{/* <div className="photo-list">
{answer.photos.map((photo, i) => <img className="photos" key={i} src={photo}></img>)}
</div> */}

export default IndividualReviewTile;