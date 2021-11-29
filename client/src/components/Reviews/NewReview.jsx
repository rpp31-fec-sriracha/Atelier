import React from 'react';
import ReactDom from 'react-dom';
import _ from 'underscore';
const axios = require('axios');

class NewReview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewLengthMessage: 'Minimum required characters left: 50',
      minReviewLength: false,
      recommend: null,
      currentCharacteristic: 'none selected',
      characteristics: {},
      starDescription: null,
      starRating: []
    };

    // this.handleFormSubmit = this.props.updateSortType.bind(this);
    this.setRecommend = this.setRecommend.bind(this);
    this.setCharacteristic = this.setCharacteristic.bind(this);
    this.checkReviewLength = this.checkReviewLength.bind(this);
    this.setRating = this.setRating.bind(this);
    this.setSummary = this.setSummary.bind(this);
    this.setName = this.setName.bind(this);
    this.setEmail = this.setEmail.bind(this);
  }

  checkReviewLength(e) {
    let charsNeeded = 50 - e.target.value.length;

    if (charsNeeded > 0) {
      this.setState({
        reviewLengthMessage: `Minimum required characters left: ${charsNeeded}`,
      });
    } else {
      this.setState({
        reviewLengthMessage: 'Minimum reached',
        message: e.target.value
      });
    }
  }

  setSummary(e) {
    this.setState({
      summary: e.target.value
    });
  }

  setStarRating(value) {
    let currentStars = value || 0;
    let starTypes = [];

    for (var i = 0; i < 5; i++) {
      if (currentStars >= 1) {
        starTypes[i] = 'fa fa-star';
      } else {
        starTypes[i] = 'fa fa-star-o';
      }
      currentStars--;
    }

    let newRating = starTypes.map((currentStar, i) => {
      return <div key={i} onClick={() => this.setStarAndRating(i)} className={currentStar}></div>;
    });

    this.setState({
      starRating: newRating
    });

    // this.setRating(value + 1);
  }

  setStarAndRating(value) {
    // console.log(value);
    this.setStarRating(value + 1);
    this.setRating(value + 1);
  }


  componentDidMount() {
    this.setStarRating();
  }


  setRating(value) {
    let description = '';

    if (value === 5) {
      description = 'Great';
    } else if (value === 4) {
      description = 'Good';
    } else if (value === 3) {
      description = 'Average';
    } else if (value === 2) {
      description = 'Fair';
    } else if (value === 1) {
      description = 'Poor';
    }
    // switch (value) {
    // case ('1'):
    //   description = 'Poor';
    //   break;
    // case ('2'):
    //   description = 'Fair';
    //   break;
    // case ('3'):
    //   description = 'Average';
    //   break;
    // case ('4'):
    //   description = 'Good';
    //   break;
    // case ('5'):
    //   description = 'Great';
    //   break;
    // }

    this.setState({
      rating: Number(value)
    });

    this.setState({
      starDescription: description
    });

  }

  setName(e) {
    this.setState({
      name: e.target.value
    });
  }

  setEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  setRecommend(e) {
    if (e.target.value === 'Yes') {
      this.setState({
        recommend: true
      });
    } else {
      this.setState({
        recommend: false
      });
    }
  }

  setCharacteristic(e) {
    let selectedID = this.props.characteristics[e.target.name].id;
    let newCharacteristics = this.state.characteristics;
    newCharacteristics[selectedID] = Number(e.target.value);

    let description = null;

    switch (e.target.name) {
    case ('Size'):
      if (e.target.value === '5') {
        description = 'A size too wide';
      } else if (e.target.value === '4') {
        description = '1/2 a size too big';
      } else if (e.target.value === '3') {
        description = 'Perfect';
      } else if (e.target.value === '2') {
        description = '1/2 a size too small';
      } else {
        description = 'A size too small';
      }
      break;
    case ('Width'):
      if (e.target.value === '5') {
        description = 'Too wide';
      } else if (e.target.value === '4') {
        description = 'Slightly wide';
      } else if (e.target.value === '3') {
        description = 'Perfect';
      } else if (e.target.value === '2') {
        description = 'Slightly narrow';
      } else {
        description = 'Too narrow';
      }
      break;
    case ('Comfort'):
      if (e.target.value === '5') {
        description = 'Perfect';
      } else if (e.target.value === '4') {
        description = 'Comfortable';
      } else if (e.target.value === '3') {
        description = 'Ok';
      } else if (e.target.value === '2') {
        description = 'Slightly uncomfortable';
      } else {
        description = 'Uncomfortable';
      }
      break;
    case ('Quality'):
      if (e.target.value === '5') {
        description = 'Perfect';
      } else if (e.target.value === '4') {
        description = 'Pretty great';
      } else if (e.target.value === '3') {
        description = 'What I expected';
      } else if (e.target.value === '2') {
        description = 'Below average';
      } else {
        description = 'Poor';
      }
      break;
    case ('Length'):
      if (e.target.value === '5') {
        description = 'Runs long';
      } else if (e.target.value === '4') {
        description = 'Runs slightly long';
      } else if (e.target.value === '3') {
        description = 'Perfect';
      } else if (e.target.value === '2') {
        description = 'Runs slightly short';
      } else {
        description = 'Runs short';
      }
      break;
    case ('Fit'):
      if (e.target.value === '5') {
        description = 'Runs long';
      } else if (e.target.value === '4') {
        description = 'Runs slightly long';
      } else if (e.target.value === '3') {
        description = 'Perfect';
      } else if (e.target.value === '2') {
        description = 'Runs slightly tight';
      } else {
        description = 'Runs tight';
      }
      break;
    }

    this.setState({
      currentCharacteristic: description,
      characteristics: newCharacteristics
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    // console.log('You have submitted the form');
    let formData = {
      // eslint-disable-next-line camelcase
      product_id: Number(this.props.productID),
      rating: this.state.rating,
      summary: this.state.summary,
      body: this.state.message,
      recommend: this.state.recommend,
      name: this.state.name,
      email: this.state.email,
      characteristics: this.state.characteristics
    };

    let validated = this.validate(formData);

    if (validated) {
      axios.post('/addReview', formData)
        .then(function (response) {
          console.log(response);
          //get reviews and metadata again?
        })
        .catch(function (error) {
          console.log(error);
        });

      this.props.onClose();
    }
  }

  validate(formData) {
    let validated = true;
    let alertMessage = 'Please ensure that the following fields are completed correctly: ';

    console.log(formData);
    if (formData.rating === undefined) {
      alertMessage += 'Rating, ';
      validated = false;
    }

    if (formData.recommend === null) {
      alertMessage += 'Recommendation, ';
      validated = false;
    }

    if (formData.summary === undefined) {
      alertMessage += 'Summary, ';
      validated = false;
    }

    if (formData.body === undefined || formData.body.length < 50) {
      alertMessage += 'Review body, ';
      validated = false;
    }

    if (formData.name === undefined) {
      alertMessage += 'Nickname, ';
      validated = false;
    }

    if (formData.email === undefined) {
      alertMessage += 'Email, ';
      validated = false;
    } else {
      if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) === false) {
        alertMessage += 'Email, ';
        validated = false;
      }
    }


    alertMessage = alertMessage.slice(0, alertMessage.length - 2);

    if (validated) {
      return true;
    } else {
      window.alert(alertMessage);
      return false;
    }
  }


  render () {
    if (this.props.open !== true) {
      return null;
    }

    return ReactDom.createPortal(
      <>
        <div className="overlay"/>
        <div className="modal">
          <div className="new-review">
            <form>
              <div className="exit">
                <button onClick={() => this.props.onClose()}>X</button>
              </div>
              <h3 className="modal-title">Write Your Review</h3>
              <h4 className="modal-subtitle">About the {this.props.productName}.</h4>
              <div>Overall Rating*   <span>{this.state.starDescription}</span></div>
              <div>{this.state.starRating}</div>

              {/* <div onChange={this.setRating}>
                <label>Overall rating</label><span id="mandatory-asterisk">*</span>
                <label>
                  <input type="radio" id="1" name="rating" value="1"></input>
                  1
                </label>
                <label>
                  <input type="radio" id="2" name="rating" value="2"></input>
                  2
                </label>
                <label>
                  <input type="radio" id="3" name="rating" value="3"></input>
                  3
                </label>
                <label>
                  <input type="radio" id="4" name="rating" value="4"></input>
                  4
                </label>
                <label>
                  <input type="radio" id="5" name="rating" value="5"></input>
                  5
                </label>
                <span>{this.state.starDescription}</span>
              </div> */}
              <div onChange={this.setRecommend}>
                <label>Do you recommend this product?</label><span id="mandatory-asterisk">*</span>
                <label>
                  <input type="radio" id="yes" name="recommend" value="Yes"></input>
                Yes
                </label>
                <label>
                  <input type="radio" id="no" name="recommend" value="No"></input>
                No
                </label>
              </div>
              <div>
                <label>Characteristics</label><span id="mandatory-asterisk">*</span>
                <div>{this.state.currentCharacteristic}</div>
                {_.map(this.props.characteristics, (characteristic, i) => {
                  return (
                    <div key={i} onChange={this.setCharacteristic}>
                      <label>{i}</label><span id="mandatory-asterisk">*</span>
                      <label>
                        <input type="radio" id="1" name={i} value="1"></input>
                        1
                      </label>
                      <label>
                        <input type="radio" id="2" name={i} value="2"></input>
                        2
                      </label>
                      <label>
                        <input type="radio" id="3" name={i} value="3"></input>
                        3
                      </label>
                      <label>
                        <input type="radio" id="4" name={i} value="4"></input>
                        4
                      </label>
                      <label>
                        <input type="radio" id="5" name={i} value="5"></input>
                        5
                      </label>
                    </div>
                  );
                })}
              </div>
              <div onChange={this.setSummary}>
                <label>Review Summary*</label>
                <input type="text" name="summary" placeholder="Example: Best purchase ever!" maxLength="60"></input>
              </div>
              <div>
                <div>{this.state.reviewLengthMessage}</div>
                <label>Review Body*</label>
                <input type="text" name="summary" placeholder="Why did you like the product or not?" onChange={this.checkReviewLength}></input>
              </div>
              <div>
                <label>Upload photos</label>
                <input type="file" name="photos"></input>
              </div>
              <div onChange={this.setName}>
                <label>What is your nickname?</label><span id="mandatory-asterisk">*</span>
                <input type="text" name="nickname" placeholder="Example: jackson11!"></input>
                <div>For privacy reasons, do not use your full name or email address</div>
              </div>
              <div onChange={this.setEmail}>
                <label>Your email</label><span id="mandatory-asterisk">*</span>
                <input type="text" name="email" placeholder="Example: jackson11@email.com"></input>
                <div>For authentication reasons, you will not be emailed</div>
              </div>
              <input type="submit" value="Submit review" onClick={this.handleFormSubmit.bind(this)}></input>
            </form>
          </div>
        </div>
      </>,
      document.getElementById('review-portal')
    );
  }
}

export default NewReview;