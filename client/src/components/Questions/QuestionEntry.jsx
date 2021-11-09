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
        <div className="question">
          <div className="question-flex-row">
            <div className="left">
              <div className="title">Q:  </div>
              <div data-testid="q-body" className="Q-body">{question.question_body}</div>
            </div>
            <div className="right">
              <span>Helpful?</span>
              <span className="_divider"></span>
              <button className="helpful-and-report">Yes({question.question_helpfulness})</button>
              <span className="_divider">|</span>
              <button className="helpful-and-report" onClick={() => this.openModal()}>Add Answer</button>
              <AnswerModal isOpen={isOpen} id="#answer-modal" closeModal={this.closeModal.bind(this)} question={question} productInfo={productInfo}></AnswerModal>
            </div>
          </div>
        </div>
        <div className="answers">
          <div className="answer-flex-row">
            <div className="left">A:  </div>
            <div>
              {Object.keys(question.answers).map((id, i) => {
                let answer = question.answers[id];
                return <AnswerEntry key={i} answer={answer} />;
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default QuestionEntry;