import React, { useState } from 'react';
import AnswerEntry from './AnswerEntry.jsx';
import AnswerModal from './AnswerModal.jsx';

class QuestionEntry extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
  }
  openModal() {
    this.setState({ isOpen: true });
  }
  closeModal() {
    this.setState({ isOpen: true });
  }
  // handle report question
  // handle mark helpful
  // handle add answer
  // render < AnswerModal >
  render() {
    const { question, productInfo } = this.props;
    const { isOpen } = this.state;

    return (
      <>
        <div id="question">
          <span className="Q">Q:</span>
          <span className="Q-body">{question.question_body}</span>
          <div>
            <div className="helpful">
              <span>Helpful?</span>
              <button className="increment-helpful">Yes({question.question_helpfulness})</button>
              <span class="_divider">|</span>
              <a href="#answer-modal" className="add-answer" onClick={() => this.openModal()}>Add Answer</a>
            </div>
            <AnswerModal isOpen={isOpen} id="#answer-modal" closeModal={this.closeModal.bind(this)} question={question} productInfo={productInfo}></AnswerModal>
          </div>
          <div className="answers-list">
            <span className="A">A:</span>
            {Object.keys(question.answers).map((id, i) => {
              let answer = question.answers[id];
              return <AnswerEntry key={i} answer={answer} />;
            })}
          </div>
        </div>
      </>
    );
  }
}

export default QuestionEntry;