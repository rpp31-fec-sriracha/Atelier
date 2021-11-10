import React from 'react';
import ReactDom from 'react-dom';
import _ from 'underscore';

class NewReview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewLength: 0,
      reviewLengthMessage: 'Minimum required characters left: 50',
      minReviewLength: false,
      recommend: true,
      currentCharacteristic: 'none selected',
      // size: 0,
      // width: 0,
      comfort: 0,
      quality: 0,
      length: 0,
      fit: 0,
    };

    // this.handleFormSubmit = this.props.updateSortType.bind(this);
    this.setRecommend = this.setRecommend.bind(this);
    this.setCharacteristic = this.setCharacteristic.bind(this);
    this.checkReviewLength = this.checkReviewLength.bind(this);
  }

  checkReviewLength(e) {
    // console.log(this.state.charactersRemaining);
    // console.log(e.target.value);
    let charsNeeded = 50 - e.target.value.length;

    if (charsNeeded > 0) {
      this.setState({
        reviewLengthMessage: `Minimum required characters left: ${charsNeeded}`
      });
    } else {
      this.setState({
        reviewLengthMessage: 'Minimum reached'
      });
    }
  }

  setRecommend(e) {
    this.setState({
      recommend: e.target.value
    });
  }

  setCharacteristic(e) {
    // console.log(e);
    // console.log(e.target.name);
    let selectedChar = '';

    switch (e.target.name) {
    case 'Size':
      console.log('size');
      selectedChar = 'size';
      break;
    case 'Fit':
      console.log('width');
      selectedChar = 'width';
      break;
    case 'Fit':
      console.log('fit');
      selectedChar = 'fit';
      break;
    case 'Length':
      console.log('length');
      selectedChar = 'length';
      break;
    case 'Comfort':
      console.log('comfort');
      selectedChar = 'comfort';
      break;
    case 'Quality':
      console.log('quality');
      selectedChar = 'quality';
      break;
    default:
      console.log('Not an option');
    }

    this.setState({
      currentCharacteristic: e.target.value,
      [selectedChar]: e.target.value
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    console.log('You have submitted the form');

    this.props.onClose();
  }



  render () {
    console.log(this.props.characteristics);
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
              <div>
                <label>Overall rating</label><span id="mandatory-asterisk">*</span>
                <input type="text" name="rating"></input></div>
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
                <input type="text" name="characteristics"></input>
                <div>{this.state.currentCharacteristic}</div>
              </div>
              <div>
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
              <div>
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
              <div>
                <label>What is your nickname?</label><span id="mandatory-asterisk">*</span>
                <input type="text" name="nickname" placeholder="Example: jackson11!"></input>
                <div>For privacy reasons, do not use your full name or email address</div>
              </div>
              <div>
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