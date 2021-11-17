import React from 'react';
import AnswerEntry from './AnswerEntry.jsx';
import AnswerModal from './AnswerModal.jsx';
import httpRequest from './httpRequest.js';

class QuestionEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      visibleCount: 2,
      markCount: 0,
      mark: this.props.question.question_helpfulness
    };
  }

  openModal() {
    this.setState({ isOpen: true });
  }
  closeModal() {
    this.setState({ isOpen: false });
  }

  handleMark(id, subject) {
    httpRequest.mark(id, subject)
      .then(() => this.setState({
        mark: this.props.question.question_helpfulness + 1
      }))
      .catch((error) => window.alert(error));
  }

  handleCount() {
    this.setState({
      markCount: this.state.markCount + 1,
    });
  }

  render() {
    const { question, productInfo, handleAddAnswer } = this.props;
    const { isOpen, visibleCount, markCount, mark } = this.state;
    console.log(handleAddAnswer)
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
                if (markCount === 1) {
                  e.preventDefault();
                } else {
                  this.handleMark(question.question_id, 'q');
                  this.handleCount();
                }
              }}>
                Yes({mark})</button>
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
                return <AnswerEntry key={i} answer={answer} />;
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