import React from 'react';
import axios from 'axios';

class IndividualReviewTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterSelected: 'relevance',
      showReviewLink: false,
      reviewToShow: this.props.currentReview.body,
      // helpfulCount: this.props.currentReview.helpfulness,
      helpfulClicked: false,
      report: 'Report',
      reportClicked: false
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
    console.log(this.props.index);
    if (this.props.currentReview.body.length <= 250) {
      this.setState({
        showReviewLink: false,
        reviewToShow: this.props.currentReview.body
      });
    } else {
      this.setState({
        showReviewLink: true,
        reviewToShow: this.props.currentReview.body.slice(0, 251)
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (this.props.currentReview.body.length <= 250) {
        this.setState({
          showReviewLink: false,
          reviewToShow: this.props.currentReview.body,
          helpfulCount: this.props.currentReview.helpfulness,
          helpfulClicked: false,
          report: 'Report',
          reportClicked: false
        });
      } else {
        this.setState({
          showReviewLink: true,
          reviewToShow: this.props.currentReview.body.slice(0, 251),
          helpfulCount: this.props.currentReview.helpfulness,
          helpfulClicked: false,
          report: 'Report',
          reportClicked: false
        });
      }
    }
  }

  showFullReview(e) {
    this.setState({
      reviewToShow: this.props.currentReview.body,
      showReviewLink: false
    });
  }

  addHelpful() {
    if (this.state.helpfulClicked === false) {
      this.setState({
        helpfulClicked: true,
      });

      this.props.setHelpfulness(this.props.index);

      return new Promise((resolve, reject) => {
        axios.request({
          url: `api/reviews/${this.props.currentReview.review_id}/helpful`,
          method: 'put',
          baseURL: 'http://localhost:3000'
        })
          .then(() => resolve())
          .catch(error => reject(error));
      });
    }
  }

  addReport() {
    if (this.state.reportClicked === false) {
      this.setState({
        reportClicked: true,
        report: 'Reported'
      });

      return new Promise((resolve, reject) => {
        axios.request({
          url: `api/reviews/${this.props.currentReview.review_id}/report`,
          method: 'put',
          baseURL: 'http://localhost:3000'
        })
          .then(() => resolve())
          .catch(error => reject(error));
      });
    }
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
      {/* <div>{this.props.currentReview.body}</div> */}
      {this.state.showReviewLink ? <div onClick={() => this.showFullReview()}><u>Show more</u></div> : null}
      <div>{this.props.currentReview.response}</div>
      <div className="photo-list">
        {this.props.currentReview.photos.map((photo, i) => <img className="photos" key={i} src={photo.url}></img>)}
      </div>
      {this.props.currentReview.recommend ? <div>{`${String.fromCharCode(10004)} I recommend this product`}</div> : null}
      {this.props.currentReview.response ? (<div className={'seller-response'}>
        <div>Response from seller:</div>
        {this.props.currentReview.response}
      </div>) : null}
      {/* <div>Helpful? <u>Yes</u> ({this.props.currentReview.helpfulness}) | <span>Report</span></div> */}
      {/* <div>Helpful? <span onClick={() => this.addHelpful()}><u>Yes</u> ({this.state.helpfulCount})</span> | <span onClick={() => this.addReport()}>{this.state.report}</span></div> */}
      <div>Helpful? <span onClick={() => this.addHelpful()}><u>Yes</u> ({this.props.currentReview.helpfulness})</span> | <span onClick={() => this.addReport()}>{this.state.report}</span></div>
    </div>);
  }
}

export default IndividualReviewTile;