import React from 'react';
import ReactDom from 'react-dom';

class NewReview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewLength: 0,
      charactersRemaining: 50,
      minReviewLength: false
    };

    // this.handleFormSubmit = this.props.updateSortType.bind(this);
  }

  checkReviewLength() {


  }


  handleFormSubmit(e) {
    e.preventDefault();

    console.log('You have submitted the form');

    this.props.onClose();
  }



  render () {
    // console.log(this.props.characteristics);
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
                <input type="text" name="question"></input></div>
              <div>
                <label>Do you recommend this product?</label><span id="mandatory-asterisk">*</span>
                <input type="radio" id="yes" name="recommend" value="Yes"></input>
                <label for="Yes">Yes</label>
                <input type="radio" id="no" name="recommend" value="No"></input>
                <label for="no">No</label>
              </div>
              <div>
                <label>Characteristics</label><span id="mandatory-asterisk">*</span>
                <input type="text" name="characteristics"></input>
              </div>
              <div>
                <label>Review Summary</label>
                <input type="text" name="summary" placeholder="Example: Best purchase ever!" maxLength="60"></input>
                <div>Minimum required characters left: {this.state.charactersRemaining}</div>
              </div>
              <div>
                <span id="mandatory-asterisk">*</span>
                <input type="text" name="summary" placeholder="Why did you like the product or not?"></input>
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