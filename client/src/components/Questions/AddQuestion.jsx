import React from 'react';

class AddQuestion extends React.Component {
  constructor() {
    super();
    this.state = {
      question: '',
      nickname: '',
      email: ''
    };
  }

  // handle add question
  handleAddQuestion() {
    // post request to server
  }
  // handle input change
  handleInputChange() {
    // update the state
  }

  render() {
    const { productInfo } = this.props;

    return (
      <>
        <div className="add-question">
          <form onSubmit={this.handleAddQuestion}>
            <div className="modal-title">Ask Your Question</div>
            <div className="modal-subtitle">About the {productInfo}.</div>
            <label>Your Question</label><span id="mandatory-asterisk">*</span>
            <input type="text" name="question"></input>
            <label>What is your nickname</label><span id="mandatory-asterisk">*</span>
            <input type="text" name="nickname"></input>
            <label>Your email</label><span id="mandatory-asterisk">*</span>
            <input type="email" name="email"></input>

            <input type="submit" value="Submit question"></input><span id="mandatory-asterisk">*</span>
          </form>
        </div>
      </>
    );
  }

}

export default AddQuestion;