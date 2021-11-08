import React from 'react';

const NewReview = function(props) {
  if (props.open !== true) {
    return null;
  }

  return (
    <>
      <div className="overlay"/>
      <div className="modal">
        <div className="new-review">
          <form>
            <h3 className="modal-title">Write Your Review</h3>
            <h4 className="modal-subtitle">About the {props.productName}.</h4>
            <div>
              <label>Overall rating</label><span id="mandatory-asterisk">*</span>
              <input type="text" name="question"></input></div>
            <div>
              <label>Do you recommend this product?</label><span id="mandatory-asterisk">*</span>
              <input type="text" name="recommend"></input>
            </div>
            <div>
              <label>Characteristics</label><span id="mandatory-asterisk">*</span>
              <input type="text" name="characteristics"></input>
            </div>
            <div>
              <label>Review Summary</label>
              <input type="text" name="summary" placeholder="Example: Best purchase ever!"></input>
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
            <input type="submit" value="Submit review" onClick={props.onClose}></input>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewReview;