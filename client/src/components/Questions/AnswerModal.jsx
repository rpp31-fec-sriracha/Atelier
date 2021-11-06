import React from 'react';
import ReactDom from 'react-dom';

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
  handleInputChange(e) {
    this.setState({
      [name]: e.target.value
    });
  }
  render() {
    const { question, productInfo, isOpen, closeModal } = this.props;
    const { answer, nickname, email, photos } = this.state;

    return ReactDom.createPortal(
      <>
        {isOpen ? (
          <>
            <div className="overlay"></div>
            <div className="modal">
              <form onSubmit={() => closeModal()}>
                <div className="modal-title">Submit your Answer</div>
                <div className="modal-subtitle"><b>{productInfo}</b>: {question.question_body}</div>
                <label>Your Answer</label><span id="mandatory-asterisk">*</span>
                <textarea value={answer} name="answer" onChange={(e) => this.handleInputChange(e)}></textarea>
                <label>What is your nickname</label><span id="mandatory-asterisk">*</span>
                <input type="text" value={nickname} name="nickname" onChange={(e) => this.handleInputChange(e)} placeholder="Example: jack543!"></input>
                <label>Your email</label><span id="mandatory-asterisk">*</span>
                <input type="email" value={email} name="email" onChange={(e) => this.handleInputChange(e)} placeholder="Example: jack@email.com"></input>
                <label>Upload your photos</label>
                <input type="file" name="photo" onChange={(e) => this.handleInputChange(e)}></input>

                <input type="submit" value="Submit answer"></input>
              </form>
            </div>
          </>) : null}

      </>,
      document.getElementById('answer-portal')
    );
  }
}

export default AnswerModal;