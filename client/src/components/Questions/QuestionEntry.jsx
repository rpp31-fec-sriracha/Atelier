import React, { useState } from 'react';
import AnswerEntry from './AnswerEntry.jsx';
import AnswerModal from './AnswerModal.jsx';

class QuestionEntry extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      visibleCount: 2,
      count: 0
    };
  }
  openModal() {
    this.setState({ isOpen: true });
  }
  closeModal() {
    this.setState({ isOpen: false });
  }
  // handle report question

  // handle mark helpful
  handleCount() {
    this.setState({
      count: this.state.count + 1
    });
  }

  render() {
    const { question, productInfo, handleAddAnswer, handleMark } = this.props;
    const { isOpen, visibleCount, count } = this.state;
    return (
      <>
        <div className="question">
          <div className="question-flex-row">
            <div className="left">
              <div className="title">Q:  </div>
              <div data-testid="q-body" className="Q-body">{question.question_body}</div>
            </div>
            <div className="right userInfos">
              <span>Helpful?</span>
              <span className="_divider"></span>
              <button className="helpful-and-report" onClick={(e) => {
                if (count === 1) {
                  e.preventDefault();
                } else {
                  handleMark(question.question_id, 'q');
                  this.handleCount();
                }
              }}>Yes({question.question_helpfulness})</button>
              <span className="_divider">|</span>
              <button className="helpful-and-report" onClick={() => this.openModal()}>Add Answer</button>
              <AnswerModal isOpen={isOpen} closeModal={this.closeModal.bind(this)} question={question} productInfo={productInfo} handleAddAnswer={handleAddAnswer} />
            </div>
          </div>
        </div>
        <div className="answers">
          <div className="answer-flex-row">
            <div className="left">A:  </div>
            <div>
              {Object.values(question.answers).slice(0, visibleCount).map((answer, i) => {
                return <AnswerEntry key={i} answer={answer} handleMark={handleMark} />;
              })}
              {(Object.values(question.answers).length > 2) ?
                <button className="load-more-a" onClick={() => this.setState({ visibleCount: this.state.visibleCount + 2 })}>LOAD MORE ANSWERS</button>
                : <div></div>
              }
            </div>

          </div>
        </div>
      </>
    );
  }
}

export default QuestionEntry;