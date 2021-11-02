import React from 'react';

class AnswerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      nickname: '',
      email: '',
      photos: ''
    };
  }
  // handle photo(file) upload
  // invoke handle add answer
  // handle input change
  render() {
    const { question, productInfo } = this.props;
    const { answer, nickname, email, photos } = this.state;

    return (
      <>
        <div className="answer-modal">
          <form onSubmit={this.handleAddAnswer}>
            <div className="modal-title">Submit your Answer</div>
            <div className="modal-subtitle">{productInfo}: {question.question_body}</div>
            <label>Your Answer</label><span id="mandatory-asterisk">*</span>
            <textarea value={answer} name="answer"></textarea>
            <label>What is your nickname</label><span id="mandatory-asterisk">*</span>
            <input type="text" value={nickname} name="nickname" placeholder="Example: jack543!"></input>
            <label>Your email</label><span id="mandatory-asterisk">*</span>
            <input type="email" value={email} name="email" placeholder="Example: jack@email.com"></input>
            <label>Upload your photos</label>
            <input type="file" name="photo"></input>

            <input type="submit" value="Submit answer"></input>
          </form>
        </div>
      </>
    );
  }
}

export default AnswerModal;