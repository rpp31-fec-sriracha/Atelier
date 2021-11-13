import React from 'react';
import ReactDom from 'react-dom';
import _ from 'underscore';
const axios = require('axios');

//NEED TO ADD VALIDATION

class NewReview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewLengthMessage: 'Minimum required characters left: 50',
      minReviewLength: false,
      recommend: true,
      currentCharacteristic: 'none selected',
      characteristics: {},
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
    // console.log(this.state.charactersRemaining);
    // console.log(e.target.value);
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

  setRating(e) {
    this.setState({
      rating: Number(e.target.value)
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

    this.setState({
      currentCharacteristic: e.target.value,
      characteristics: newCharacteristics
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    // console.log('You have submitted the form');
    let formData = {
      // eslint-disable-next-line camelcase
      product_id: this.props.productID,
      rating: this.state.rating,
      summary: this.state.summary,
      body: this.state.message,
      recommend: this.state.recommend,
      name: this.state.name,
      email: this.state.email,
      characteristics: this.state.characteristics
    };

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
              <h3 className="modal-title">Write Your Review</h3>
              <h4 className="modal-subtitle">About the {this.props.productName}.</h4>
              <div onChange={this.setRating}>
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
              </div>
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
                <label>Review Summary</label>
                <input type="text" name="summary" placeholder="Example: Best purchase ever!" maxLength="60"></input>
              </div>
              <div>
                <span id="mandatory-asterisk">*</span>
                <div>{this.state.reviewLengthMessage}</div>
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