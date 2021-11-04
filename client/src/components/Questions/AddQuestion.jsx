import React from 'react';
import QuestionModal from './QuestionModal.jsx';

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
    // validate form inputs
    // if there's any invalid entries,
    // render warning message "You must enter the following:”
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
          <QuestionModal productInfo={productInfo} handleAddQuestion={this.handleAddQuestion.bind(this)} />
        </div>
      </>
    );
  }

}

export default AddQuestion;